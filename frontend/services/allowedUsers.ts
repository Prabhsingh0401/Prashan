import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function checkUserAllowed(email: string): Promise<boolean> {
  try {
    const allowedDoc = await getDoc(doc(db, "allowed_users", email.toLowerCase()));
    return allowedDoc.exists();
  } catch {
    return false;
  }
}