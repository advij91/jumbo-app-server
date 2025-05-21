import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

export const sendVerificationCode = async (phoneNumber, code) => {
    console.log('Sending verification code:', { phoneNumber, code });
    try {
        // Construct the payload
        const payload = {
            messaging_product: 'whatsapp',
            to: phoneNumber,
            type: 'template',
            template: {
                name: 'wa_app_verification',
                language: {
                    code: 'en_US',
                },
                components: [
                    {
                        type: 'body',
                        parameters: [
                            {
                                type: 'text',
                                text: code,
                            }
                        ],
                    },
                    {
                        type: 'button',
                        sub_type: 'url',
                        index: '0',
                        parameters: [
                            {
                                type: 'text',
                                text: code
                            }
                        ]
                    }
                ],
            },
        };

        // Log the full payload for debugging
        // console.log('Sending payload:', JSON.stringify(payload, null, 2));

        // Send the request
        const response = await axios.post(
            'https://graph.facebook.com/v22.0/578987225307989/messages',
            payload,
            {
                headers: {
                    Authorization: `Bearer ${process.env.WA_TOKEN}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error sending verification code:', error.response?.data || error.message);
        throw error;
    }
};