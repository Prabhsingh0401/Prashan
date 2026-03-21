import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Standard Nodemailer configuration
// Note: if you are using Gmail, you need to use an "App Password", not your regular password
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can change this to a different service provider or SMTP host
    auth: {
        user: process.env.EMAIL_USER, // e.g. "yourname@gmail.com"
        pass: process.env.EMAIL_PASS  // e.g. "abcd efgh ijkl mnop" (App Password)
    }
});

export const sendOTP = async (email: string, otp: string) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.warn("⚠️ EMAIL_USER or EMAIL_PASS not set in .env! Email will fail.");
        }

        const mailOptions = {
            from: `"Prashan Support" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Prashan - Verify Your Account',
            text: `Your OTP for sign up is: ${otp}`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; text-align: center;">
                <h2>Welcome to Prashan!</h2>
                <p>Your one-time password to verify your account is:</p>
                <h1 style="color: #4CAF50; letter-spacing: 5px;">${otp}</h1>
                <p>This OTP is valid for 10 minutes.</p>
              </div>
            `
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('OTP Email sent successfully: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending OTP:', error);
        throw error;
    }
};
