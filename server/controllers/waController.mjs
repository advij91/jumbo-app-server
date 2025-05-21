import { sendVerificationCode } from "../middleware/waMessageService.mjs";

export const sendVerificationCodeHandler = async (req, res) => {
    console.log(req.body);
    const { phoneNumber, code } = req.body;


    if (!phoneNumber) {
        return res.status(400).json({ error: 'Phone number is required' });
    }

    try {
        const result = await sendVerificationCode(phoneNumber, code);
        res.status(200).json({ message: 'Verification code sent successfully', result });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send verification code', details: error.message });
    }
};