import { Request, Response } from 'express';
import { auth, db } from '../config/firebase.js';
import { sendOTP } from '../services/emailService.js';

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ error: 'Name, email, and password are required' });
            return;
        }

        // 1. Check if user already exists in Firebase Auth
        try {
            await auth.getUserByEmail(email);
            res.status(400).json({ error: 'User already exists' });
            return;
        } catch (error: any) {
            if (error.code !== 'auth/user-not-found') {
                throw error;
            }
        }

        // 2. Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // 3. Store pending user in Firestore
        await db.collection('temp_users').doc(email).set({
            name,
            email,
            password, // Stored temporarily until verification. In production, consider hashing if not using Firebase Admin for user creation immediately.
            otp,
            createdAt: new Date(),
            expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
        });

        // 4. Send OTP
        await sendOTP(email, otp);

        res.status(200).json({ message: 'OTP sent successfully to email' });
    } catch (error: any) {
        console.error('Signup error:', error);
        res.status(500).json({ error: error.message || 'Internal server error while processing signup' });
    }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            res.status(400).json({ error: 'Email and OTP are required' });
            return;
        }

        // 1. Fetch doc from temp_users
        const tempUserDoc = await db.collection('temp_users').doc(email).get();
        
        if (!tempUserDoc.exists) {
            res.status(400).json({ error: 'No pending signup found for this email' });
            return;
        }

        const tempUser = tempUserDoc.data();

        if (!tempUser || tempUser.expiresAt < Date.now()) {
            await db.collection('temp_users').doc(email).delete();
            res.status(400).json({ error: 'OTP has expired' });
            return;
        }

        if (tempUser.otp !== otp) {
            res.status(400).json({ error: 'Invalid OTP' });
            return;
        }

        // 2. Create user in Firebase Auth
        const userRecord = await auth.createUser({
            email: tempUser.email,
            password: tempUser.password,
            displayName: tempUser.name,
            emailVerified: true,
        });

        // 3. Create profile in Firestore users collection
        await db.collection('users').doc(userRecord.uid).set({
            uid: userRecord.uid,
            name: tempUser.name,
            email: tempUser.email,
            provider: 'password',
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        // 4. Cleanup temp store
        await db.collection('temp_users').doc(email).delete();

        // 5. Generate Custom Token for client login
        const customToken = await auth.createCustomToken(userRecord.uid);

        res.status(200).json({ 
            message: 'Email verified and account created successfully',
            user: {
                uid: userRecord.uid,
                name: userRecord.displayName,
                email: userRecord.email
            },
            token: customToken // Use custom token to sign in on frontend
        });

    } catch (error: any) {
        console.error('OTP Verification error:', error);
        res.status(500).json({ error: error.message || 'Internal server error while verifying OTP' });
    }
};

