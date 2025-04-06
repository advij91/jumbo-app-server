import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import dotenv from 'dotenv'

dotenv.config()

const jwtSecret = process.env.JWT_AUTH_SECRET
const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET

// Generate auth token
export const generateAuthToken = (payload) => {
    return jwt.sign(payload, jwtSecret, {expiresIn: '30m'})
}

// Generate refresh token
export const generateRefreshToken = (payload) => {
    return jwt.sign(payload, jwtRefreshSecret, {expiresIn: '7d'})
}

// Validate auth token
export const validateAuthToken = (token) => {
    try {
        return jwt.verify(token, jwtSecret)
    } catch (error) {
        return null
    }
}

// Validat refresh token
export const validateRefreshToken = (token) => {
    try {
        return jwt.verify(token, jwtRefreshSecret)
    } catch (error) {
        return null
    }
}