import { NextFunction, Request, Response } from "express";
import { ForbidenError, UnAuthorizeError } from "../common/errors";
import { verifyAccessToken } from "../common/auth/jwt";
import { UserRole } from "../../generated/prisma/enums";

export const isAuthenticated = (
    req: Request,
    _res: Response,
    next: NextFunction
) => {
    try {

        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new UnAuthorizeError("Invalid credential");
        }
        const decoded = verifyAccessToken(token)
        if (!decoded) {
            throw new UnAuthorizeError("Invalid credential")
        }
        req.user = decoded;
        next()
    } catch (error) {
        return next(error)
    }
}

export const hasRole = (
    allowedRole: UserRole[]
) => {
    return (
        req: Request,
        _res: Response,
        next: NextFunction
    ) => {
        if (!req.user?.role || !allowedRole.includes(req.user?.role)) {
            throw new ForbidenError("Your are not allowed.");
        }
        next();

    }
}