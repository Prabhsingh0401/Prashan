import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { sendOTP } from '../services/emailService.js';

const JWT_SECRET = process.env.JWT_SECRET || 'your-super-secret-jwt-key';

// In-memory mock database
const users: any[] = [];
const pendingVerification: Record<string, any> = {};

export const signup = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ error: 'Name, email, and password are required' });
            return;
        }

        const existingUser = users.find(u => u.email === email);
        if (existingUser) {
            res.status(400).json({ error: 'User already exists' });
            return;
        }

        // Generate 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store pending user
        pendingVerification[email] = {
            name,
            email,
            password, // Password should be hashed in production
            otp,
            expiresAt: Date.now() + 10 * 60 * 1000 // 10 minutes
        };

        // Send OTP
        await sendOTP(email, otp);

        res.status(200).json({ message: 'OTP sent successfully to email' });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ error: 'Internal server error while processing signup' });
    }
};

export const verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            res.status(400).json({ error: 'Email and OTP are required' });
            return;
        }

        const pendingUser = pendingVerification[email];

        if (!pendingUser) {
            res.status(400).json({ error: 'No pending signup found for this email' });
            return;
        }

        if (pendingUser.expiresAt < Date.now()) {
            delete pendingVerification[email];
            res.status(400).json({ error: 'OTP has expired' });
            return;
        }

        if (pendingUser.otp !== otp) {
            res.status(400).json({ error: 'Invalid OTP' });
            return;
        }

        // Create actual user
        const newUser = {
            id: Date.now().toString(),
            name: pendingUser.name,
            email: pendingUser.email,
            password: pendingUser.password, // Remember to hash in production
            isVerified: true
        };

        users.push(newUser);
        delete pendingVerification[email];

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ 
            message: 'Email verified successfully',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            },
            token
        });

    } catch (error) {
        console.error('OTP Verification error:', error);
        res.status(500).json({ error: 'Internal server error while verifying OTP' });
    }
};

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ error: 'Email and password are required' });
            return;
        }

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            res.status(400).json({ error: 'Invalid credentials' });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({ 
            message: 'Logged in successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            },
            token
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error during login' });
    }
};
