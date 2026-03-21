import { Router } from 'express';
import { signup, verifyOtp, login } from '../controllers/authController.js';

const router = Router();

router.post('/signup', signup);
router.post('/verify-otp', verifyOtp);
router.post('/login', login);

export default router;
