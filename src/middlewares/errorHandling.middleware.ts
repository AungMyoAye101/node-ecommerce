import { NextFunction, Request, Response } from "express";
import { CustomError } from "../common/errors";


export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof CustomError) {
        return res.status(err.statusCode)
            .json({
                success: false,
                status: err.statusCode,
                message: err.message,
                errors: err.generateErrors()

            })
    } else {
        return res.status(500)
            .json({
                success: false,
                status: 500,
                message: err.message || "Something went wrong.",
            })
    }
}