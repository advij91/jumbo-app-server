import express from 'express';
import { sendVerificationCodeHandler } from '../controllers/waController.mjs';

const router = express.Router();

// Route to send WhatsApp verification code
router.post('/send-verification', sendVerificationCodeHandler);

export default router;