import speakeasy from 'speakeasy';

export const generateOTP = (existingSecret = null) => {
    const secret = existingSecret || speakeasy.generateSecret().base32;
    const otp = speakeasy.totp({
        secret: secret,
        encoding: 'base32',
        step: 120,
    });
    return ({otpSecret: secret, otp: otp});
}

export const verifyOTP = ({otpSecret, otp}) => {
    return speakeasy.totp.verify({
        secret: otpSecret,
        encoding: 'base32',
        token: otp,
        step: 120,
        window: 1
    });
}