import { Queue, Worker, QueueEvents } from 'bullmq';
import { Redis } from 'ioredis';
import { Paper } from '../models/Paper.js';
import { triggerPythonGeneration } from '../services/paperService.js';
import { performUploads } from '../controllers/paperController.js';

const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
const REDIS_PORT = parseInt(process.env.REDIS_PORT || '6379', 10);

export const connection = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  maxRetriesPerRequest: null,
});

export const sessionStoreRedis = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
  db: 3,
});

export const paperQueue = new Queue('paper-generation', { connection: connection as any });
export const queueEvents = new QueueEvents('paper-generation', { connection: connection as any });

/**
 * Check if the generation task has already completed by looking up the session in Redis DB 3.
 */
export async function checkCompletedSession(sessionId: string): Promise<string | null> {
  try {
    const data = await sessionStoreRedis.get(`session:${sessionId}`);
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && parsed.latex) {
        return parsed.latex;
      }
    }
  } catch (e) {
    console.error(`[Queue] Error checking session ${sessionId} in Redis:`, e);
  }
  return null;
}

// Initialize the Worker
export const paperWorker = new Worker(
  'paper-generation',
  async (job) => {
    const { specs, sessionId, userId } = job.data;
    console.log(`[Queue Worker] Starting job ${job.id} for session ${sessionId}`);

    // 1. Check if the session is already completed in Redis session store
    const existingLatex = await checkCompletedSession(sessionId);
    if (existingLatex) {
      console.log(`[Queue Worker] Session ${sessionId} already completed. Uploading directly...`);
      const updatedPaper = await Paper.findOneAndUpdate(
        { sessionId },
        { status: 'uploading', latex: existingLatex },
        { new: true }
      );
      if (updatedPaper) {
        await performUploads(updatedPaper);
      }
      return;
    }

    // 2. Update DB to processing
    await Paper.findOneAndUpdate({ sessionId }, { status: 'processing' });

    // 3. Setup Redis subscriber to wait for completion
    const subscriber = connection.duplicate();
    await subscriber.subscribe(`progress:${sessionId}`);

    const waitPromise = new Promise<void>((resolve, reject) => {
      // Set a safety timeout of 60 minutes (supports slow CPU generation)
      const timeout = setTimeout(async () => {
        try {
          // Double-check Redis store one last time before timing out
          const latex = await checkCompletedSession(sessionId);
          if (latex) {
            console.log(`[Queue Worker] Timeout fired, but session ${sessionId} found completed in Redis. Uploading...`);
            const updatedPaper = await Paper.findOneAndUpdate(
              { sessionId },
              { status: 'uploading', latex },
              { new: true }
            );
            if (updatedPaper) {
              await performUploads(updatedPaper);
            }
            resolve();
            return;
          }
        } catch (e) {
          console.error(`[Queue Worker] Timeout recovery failed:`, e);
        }
        
        // Skip rejecting if running locally/development
        const isDev = process.env.NODE_ENV !== 'production' || !process.env.NODE_ENV;
        if (isDev) {
          console.log(`[Queue Worker] 60-minute safety timeout reached. In development, skipping timeout rejection and continuing to wait.`);
          return;
        }
        reject(new Error('Generation safety timeout exceeded (60 minutes)'));
      }, 60 * 60 * 1000);

      subscriber.on('message', async (channel, message) => {
        try {
          const event = JSON.parse(message);
          if (event.phase === 'done') {
            clearTimeout(timeout);
            
            // event.message contains the latex content
            const latex = event.message || '';
            const updatedPaper = await Paper.findOneAndUpdate(
              { sessionId },
              { status: 'uploading', latex },
              { new: true }
            );

            if (updatedPaper) {
              console.log(`[Queue Worker] Job ${job.id} done, starting S3 uploads`);
              await performUploads(updatedPaper);
            }
            resolve();
          } else if (event.phase === 'error') {
            clearTimeout(timeout);
            reject(new Error(event.message || 'Generation failed in python backend'));
          }
        } catch (e) {
          clearTimeout(timeout);
          reject(e);
        }
      });
    });

    // 4. Trigger generation on python backend (delegates to Celery immediately)
    try {
      await triggerPythonGeneration({ ...specs, sessionId });
    } catch (err) {
      await subscriber.unsubscribe(`progress:${sessionId}`);
      await subscriber.disconnect();
      throw err;
    }

    try {
      await waitPromise;
    } finally {
      await subscriber.unsubscribe(`progress:${sessionId}`);
      await subscriber.disconnect();
    }
  },
  { connection: connection as any, concurrency: 5 }
);

paperWorker.on('failed', async (job, err) => {
  if (job) {
    const { sessionId } = job.data;
    console.error(`[Queue Worker] Job ${job.id} failed:`, err.message);
    
    // Double-check if it actually finished successfully in Redis before marking as error
    try {
      const latex = await checkCompletedSession(sessionId);
      if (latex) {
        console.log(`[Queue Worker] Job failed event, but found completed in Redis. Recovery uploading...`);
        const updatedPaper = await Paper.findOneAndUpdate(
          { sessionId },
          { status: 'uploading', latex },
          { new: true }
        );
        if (updatedPaper) {
          await performUploads(updatedPaper);
          return; // Recovered successfully
        }
      }
    } catch (e) {
      console.error("[Queue Worker] Recovery check failed:", e);
    }

    await Paper.findOneAndUpdate({ sessionId }, { 
      status: 'error', 
      lastError: err.message || String(err) 
    });
  }
});
