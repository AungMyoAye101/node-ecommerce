import { CookieOptions, NextFunction, Request, Response } from "express";
import { loginService, logoutService, registerService } from "../services/auth.service";
import { successResponse } from "../common/utils/apiResponse";

const REFRESH_TOKEN_COOKIE_CONFIG: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" && true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000
}
//account register
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
                token: access_token
            })

    } catch (error) {
        return next(error);
    }
}

//account login
export const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            user,
            access_token,
            refresh_token } = await loginService(req.validatedBody);

        res.cookie("refresh_token", refresh_token, REFRESH_TOKEN_COOKIE_CONFIG);
        successResponse(
            res,
            200,
            "Login successfull.",
            {
                user,
                token: access_token
            }
        )
    } catch (error) {
        return next(error)
    }
}

export const logoutController = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        await logoutService(req.user?.userId!);
        res.clearCookie("refresh_token");
        successResponse(
            res,
            200,
            "Logout success",

        )
    } catch (error) {
        return next(error)
    }
}