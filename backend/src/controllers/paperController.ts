/**
 * paperController.ts
 * Handles /api/paper/generate and /api/paper/:sessionId/download
 */
import { Request, Response } from "express";
import { generatePaper, downloadPaper, streamGeneratePaper, GeneratePayload } from "../services/paperService.js";
import { Paper } from "../models/Paper.js";
import { uploadToS3 } from "../services/s3Service.js";
import { PassThrough } from "stream";
import crypto from "crypto";
import { paperQueue, connection, checkCompletedSession } from "../lib/queue.js";

/**
 * Internal helper to upload generated paper to S3
 */
export async function performUploads(paper: any): Promise<void> {
  const formats: ("pdf" | "docx" | "tex")[] = ["pdf", "docx", "tex"];
  try {
    const uploadPromises = formats.map(async (f) => {
      console.log(`[Upload] Downloading/Uploading format: ${f} for session ${paper.sessionId}`);
      const { stream, contentType } = await downloadPaper(paper.sessionId, f, paper.latex);
      const key = `papers/${paper.userId}/${paper.sessionId}.${f}`;
      const url = await uploadToS3(key, stream, contentType);
      return { format: f, url };
    });

    const results = await Promise.all(uploadPromises);
    const updates: any = { status: 'done', lastError: null };
    results.forEach(r => {
      if (r.format === 'pdf') updates.pdfUrl = r.url;
      if (r.format === 'docx') updates.docxUrl = r.url;
      if (r.format === 'tex') updates.texUrl = r.url;
    });

    await Paper.findOneAndUpdate({ sessionId: paper.sessionId }, updates);
    console.log(`[Upload] S3 uploads complete for ${paper.sessionId}`);
  } catch (uploadErr: any) {
    const errMsg = uploadErr instanceof Error ? uploadErr.message : String(uploadErr);
    console.error(`[Upload] S3 upload/conversion error for ${paper.sessionId}:`, errMsg);
    await Paper.findOneAndUpdate({ sessionId: paper.sessionId }, { 
      status: 'error', 
      lastError: `Upload failed: ${errMsg}` 
    });
    throw uploadErr;
  }
}

/**
 * POST /api/paper/generate
 */
export async function generate(req: Request, res: Response): Promise<void> {
  try {
    const body = req.body as GeneratePayload;
    const user = (req as any).user;

    if (!body.schoolName || !body.subject || !body.chapters?.length || !body.sections?.length) {
      res.status(400).json({ error: "Missing required fields: schoolName, subject, chapters, sections" });
      return;
    }

    // Check 5-paper generation limit per teacher
    const existingCount = await Paper.countDocuments({ userId: user.id });
    if (existingCount >= 5) {
      res.status(403).json({ error: "Generation limit reached. You can only generate up to 5 papers." });
      return;
    }

    const sessionId = crypto.randomUUID();

    // Create DB record immediately
    await Paper.findOneAndUpdate(
      { sessionId },
      {
        userId: user.id,
        sessionId,
        schoolName: body.schoolName,
        examName: body.examName,
        subject: body.subject,
        classNum: body.class_num,
        chapters: body.chapters,
        sections: body.sections,
        formatting: body.formatting,
        status: 'queued'
      },
      { upsert: true, new: true }
    );

    // Enqueue — returns in <50ms
    const job = await paperQueue.add('generate', { specs: body, sessionId, userId: user.id }, {
      attempts: 3,
      backoff: { type: 'exponential', delay: 3000 },
    });

    res.json({ jobId: job.id, sessionId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[paperController] generate error:", message);
    res.status(500).json({ error: message });
  }
}

/**
 * GET /api/paper/status/stream/:sessionId
 */
export async function statusStream(req: Request, res: Response): Promise<void> {
  const { sessionId } = req.params as { sessionId: string };

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  console.log(`[SSE] Client connected to progress channel for session ${sessionId}`);

  // Subscribe to Redis pub/sub channel for this session
  const subscriber = connection.duplicate();
  await subscriber.subscribe(`progress:${sessionId}`);

  subscriber.on("message", (channel, data) => {
    res.write(`data: ${data}\n\n`);
    try {
      const parsed = JSON.parse(data);
      if (parsed.phase === "done" || parsed.phase === "error") {
        subscriber.disconnect();
        res.end();
      }
    } catch (e) {
      // Ignore
    }
  });

  req.on("close", () => {
    console.log(`[SSE] Client disconnected from progress channel for session ${sessionId}`);
    subscriber.disconnect();
  });
}

/**
 * GET /api/paper/status/:sessionId
 */
export async function getStatus(req: Request, res: Response): Promise<void> {
  try {
    const { sessionId } = req.params as { sessionId: string };
    const user = (req as any).user;

    let paper = await Paper.findOne({ sessionId, userId: user.id });
    if (!paper) {
      res.status(404).json({ error: "Paper not found" });
      return;
    }

    // AUTO-RECOVERY LOGIC FOR MISSING LATEX (RACE CONDITION HEALING)
    // If the paper is not marked as done, check if it's completed in the Redis session store
    if (paper.status !== 'done' && !paper.latex) {
      try {
        const latex = await checkCompletedSession(sessionId);
        if (latex) {
          console.log(`[getStatus Recovery] Session ${sessionId} found completed in Redis. Healing...`);
          const updatedPaper = await Paper.findOneAndUpdate(
            { sessionId, userId: user.id },
            { status: 'uploading', latex },
            { new: true }
          );
          if (updatedPaper) {
            paper = updatedPaper;
            performUploads(paper).catch(e => {
              console.error(`[getStatus Recovery] Upload failed for ${sessionId}:`, e);
            });
          }
        }
      } catch (err) {
        console.error(`[getStatus Recovery] Redis session check failed:`, err);
      }
    }

    // STANDARD AUTO-RECOVERY LOGIC FOR FAILED S3 UPLOADS
    const retryLimit = 3;
    const currentRetryCount = (paper as any).retryCount || 0;

    if (paper.status === 'error' && paper.latex && currentRetryCount < retryLimit) {
      console.log(`[HealthCheck] Auto-retrying upload for session ${sessionId} (Attempt ${currentRetryCount + 1})`);
      
      // Immediately update DB to prevent concurrent retry attempts
      paper = await Paper.findOneAndUpdate(
        { sessionId, userId: user.id },
        { 
          status: 'uploading', 
          $inc: { retryCount: 1 },
          lastRetryAt: new Date()
        },
        { new: true }
      );

      // Start background upload attempt
      if (paper) {
        performUploads(paper).catch(e => {
          console.error(`[HealthCheck] Auto-retry failed for ${sessionId}:`, e);
        });
      }
    }

    res.json(paper);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch status" });
  }
}

/**
 * GET /api/paper/user/list
 */
export async function listUserPapers(req: Request, res: Response): Promise<void> {
  try {
    const user = (req as any).user;
    const papers = await Paper.find({ userId: user.id }).sort({ createdAt: -1 });
    
    // Check and heal any non-done papers in the list that completed in Redis
    const healedPapers = await Promise.all(papers.map(async (paper) => {
      if (paper.status !== 'done' && !paper.latex) {
        try {
          const latex = await checkCompletedSession(paper.sessionId);
          if (latex) {
            console.log(`[listUserPapers Recovery] Session ${paper.sessionId} found completed in Redis. Healing...`);
            const updated = await Paper.findOneAndUpdate(
              { sessionId: paper.sessionId },
              { status: 'uploading', latex },
              { new: true }
            );
            if (updated) {
              performUploads(updated).catch(e => console.error("[listUserPapers Recovery] Upload failed:", e));
              return updated;
            }
          }
        } catch (e) {
          console.error("Failed to heal paper in list:", e);
        }
      }
      return paper;
    }));

    res.json(healedPapers);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch papers" });
  }
}

/**
 * GET /api/paper/:sessionId/download?format=pdf|docx|tex
 */
export async function download(req: Request, res: Response): Promise<void> {
  const { sessionId } = req.params as { sessionId: string };
  const format = (req.query.format as string) ?? "pdf";

  if (!["pdf", "docx", "tex"].includes(format)) {
    res.status(400).json({ error: "format must be pdf, docx, or tex" });
    return;
  }

  try {
    const paper = await Paper.findOne({ sessionId });
    const { stream, contentType, filename } = await downloadPaper(
      sessionId,
      format as "pdf" | "docx" | "tex",
      paper?.latex ?? undefined
    );

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    stream.pipe(res);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[paperController] download error:", message);
    res.status(500).json({ error: message });
  }
}
