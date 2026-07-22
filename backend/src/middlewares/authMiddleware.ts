import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase.js';

interface AuthRequest extends Request {
    user?: any;
}

export const authenticate = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Authorization token required' });
            return;
        }

        const token = authHeader.split(' ')[1];
        
        // Verify Firebase ID Token
        const decodedToken = await auth.verifyIdToken(token);
        req.user = {
            id: decodedToken.uid,
            email: decodedToken.email,
            name: (decodedToken as any).name || decodedToken.display_name
        };
        next();
    } catch (error) {
        console.error('Auth middleware error:', error);
        res.status(401).json({ error: 'Invalid or expired token' });
    }
};
