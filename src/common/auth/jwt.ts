import jwt from "jsonwebtoken"
import { payload_type } from "../../types";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRY = '15m';

export const generateAccessToken = (payload: payload_type) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY
    })
}
export const generateRefreshToken = (payload: payload_type) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })
}

export const verifyAccessToken = (token: string): payload_type => {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as payload_type
}
export const verifyRefreshToken = (token: string): payload_type => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as payload_type
}