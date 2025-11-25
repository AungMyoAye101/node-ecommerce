import { CookieOptions, NextFunction, Request, Response } from "express";
import { registerService } from "../services/auth.service";
import { successResponse } from "../common/utils/apiResponse";

const REFRESH_TOKEN_COOKIE_CONFIG: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
}

export const registerController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {

        const { user, access_token, refresh_token } = await registerService(req.validatedBody)
        res.cookie("refresh_token", refresh_token, REFRESH_TOKEN_COOKIE_CONFIG)
        successResponse(
            res,
            201,
            "Account register successful.",
            {
                user,
                access_token
            })

    } catch (error) {
        return next(error);
    }
}