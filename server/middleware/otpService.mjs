import speakeasy from 'speakeasy';

export const generateOTP = (existingSecret = null) => {
    const secret = existingSecret || speakeasy.generateSecret().base32;
    const otp = speakeasy.totp({
        secret: secret,
        encoding: 'base32',
        step: 300,
    });
    return ({otpSecret: secret, otp: otp});
}

export const verifyOTP = ({otpSecret, otp}) => {
    return speakeasy.totp.verify({
        secret: otpSecret,
        encoding: 'base32',
        token: otp,
        step: 300,
        window: 1
    });
}