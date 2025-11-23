import { Response } from "express"

export const successResponse = (
    res: Response,
    statusCode: number = 200,
    message: string,
    result: any = null
) => {

    return res.status(statusCode)
        .json({
            success: true,
            statusCode,
            message,
            result
        })
}