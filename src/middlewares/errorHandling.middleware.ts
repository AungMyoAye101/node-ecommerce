import { NextFunction, Request, Response } from "express";
import { CustomError, ValidateError } from "../common/errors";



export const errorHandler = (
    err: Error,
    _req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (err instanceof ValidateError) {
        return res.status(err.statusCode)
            .json({
                success: false,
                status: err.statusCode,
                message: err.message,
                errors: err.generateErrors()

            })
    } else
        if (err instanceof CustomError) {
            return res.status(err.statusCode)
                .json({
                    success: false,
                    status: err.statusCode,
                    message: err.message,


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