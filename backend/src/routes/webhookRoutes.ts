import express, { Request, Response } from 'express';
import { Webhook } from 'svix';
import { adminDb } from '../services/firebaseAdmin.js';
import admin from '../services/firebaseAdmin.js';

const router = express.Router();
const endpointSecret = process.env.RESEND_WEBHOOK_SECRET;

// Note: This route requires the raw body as a string for verification.
// We use express.text() middleware specifically for this route.
router.post('/resend', express.text({ type: 'application/json' }), async (req: Request, res: Response) => {
  if (!endpointSecret) {
    console.error('RESEND_WEBHOOK_SECRET is not set in backend');
    return res.status(500).json({ error: 'Configuration error' });
  }

  const payload = req.body; // This is the raw string because of express.text()
  const headers = {
    'svix-id': req.headers['svix-id'] as string || '',
    'svix-timestamp': req.headers['svix-timestamp'] as string || '',
    'svix-signature': req.headers['svix-signature'] as string || '',
  };

  const wh = new Webhook(endpointSecret);

  let evt: any;

  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error('Webhook verification failed in backend:', err);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  const { type, data } = evt;

  console.log(`[Backend] Received Resend webhook: ${type}`);

  if (type === 'email.delivered') {
    const email = data.to[0];
    const tags = data.tags || {};
    
    if (tags.category === 'waitlist_signup') {
      try {
        console.log(`[Backend] Storing delivered waitlist email: ${email}`);
        
        await adminDb.collection('waitlist').doc(email.toLowerCase()).set({
          email: email.toLowerCase(),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          source: tags.source || 'unknown',
          status: 'delivered',
          resendId: data.email_id
        }, { merge: true });
        
        console.log('✅ [Backend] Successfully stored in Firebase after delivery');
      } catch (dbError) {
        console.error('❌ [Backend] Firebase Storage Error:', dbError);
      }
    }
  }

  res.status(200).json({ received: true });
});

export default router;
