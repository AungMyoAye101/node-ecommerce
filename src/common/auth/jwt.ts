import jwt from "jsonwebtoken"
import { TokenPayload } from "../../types";
import dotenv from "dotenv";
dotenv.config();


const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET!;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;
const ACCESS_TOKEN_EXPIRY = '7d';


if (!REFRESH_TOKEN_SECRET || !ACCESS_TOKEN_SECRET) {
    throw new Error("Token is required.")
}

export const generateAccessToken = async (payload: TokenPayload) => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, {
        expiresIn: ACCESS_TOKEN_EXPIRY
    })
}
export const generateRefreshToken = async (payload: TokenPayload) => {
    return jwt.sign(payload, REFRESH_TOKEN_SECRET, {
        expiresIn: "7d"
    })
}

export const verifyAccessToken = (token: string): TokenPayload => {

    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;

}
export const verifyRefreshToken = (token: string): TokenPayload => {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload
}