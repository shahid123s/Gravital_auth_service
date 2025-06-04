import jwt from 'jsonwebtoken'
import { pasreExpiresIn } from './parseExpiresIn';
import { appConfig } from '../config/app.config';
const { accessExpiresIn, accessSecret, refreshExpiresIn, refreshSecret } = appConfig.jwt;

export interface JwtPayload {
    userId: string;
    role: string
}



export const generateAccessToken = (data: JwtPayload): string => {
    return jwt.sign(data, accessSecret, { expiresIn: pasreExpiresIn(accessExpiresIn) }); 
}

export const generateRefreshToken = (data: JwtPayload): string => {
    return jwt.sign(data, refreshSecret, { expiresIn: pasreExpiresIn(refreshExpiresIn) });
}

export const verifyAccessToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, accessSecret) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid access token');
    }
}


export const verifyRefreshToken = (token: string): JwtPayload => {
    try {
        return jwt.verify(token, refreshSecret) as JwtPayload;
    } catch (error) {
        throw new Error('Invalid refresh token');
    }
}

