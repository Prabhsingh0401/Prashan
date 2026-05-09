import { NextRequest, NextResponse } from "next/server";
import { Webhook } from "svix";
import { adminDb } from "@/services/firebase-admin";
import * as admin from "firebase-admin";

const endpointSecret = process.env.RESEND_WEBHOOK_SECRET;

export async function POST(req: NextRequest) {
  if (!endpointSecret) {
    console.error("RESEND_WEBHOOK_SECRET is not set in frontend");
    return NextResponse.json({ error: "Configuration error" }, { status: 500 });
  }

  const payload = await req.text();
  const headers = {
    "svix-id": req.headers.get("svix-id") || "",
    "svix-timestamp": req.headers.get("svix-timestamp") || "",
    "svix-signature": req.headers.get("svix-signature") || "",
  };

  const wh = new Webhook(endpointSecret);

  let evt: any;

  try {
    evt = wh.verify(payload, headers);
  } catch (err) {
    console.error("Webhook verification failed in frontend:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { type, data } = evt;

  console.log(`[Frontend] Received Resend webhook: ${type}`);

  if (type === "email.delivered") {
    const email = data.to[0];
    const tags = data.tags || {};
    
    // Check if this is a waitlist signup
    if (tags.category === "waitlist_signup") {
      try {
        console.log(`[Frontend] Storing delivered waitlist email: ${email}`);
        
        await adminDb.collection("waitlist").doc(email.toLowerCase()).set({
          email: email.toLowerCase(),
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          source: tags.source || "unknown",
          status: "delivered",
          resendId: data.email_id
        }, { merge: true });
        
        console.log("✅ [Frontend] Successfully stored in Firebase after delivery");
      } catch (dbError) {
        console.error("❌ [Frontend] Firebase Storage Error:", dbError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
