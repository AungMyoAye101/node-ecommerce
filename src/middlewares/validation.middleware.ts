import { NextFunction, Request, Response } from "express";
import * as z from "zod";
import { ValidateError } from "../common/errors";

interface ValidatePropType {
    schema: z.Schema<any>,
    target: "BODY" | "PARAMS" | "QUERY",

}

const validate = (props: ValidatePropType) => {

    return (req: Request, _res: Response, next: NextFunction) => {

        const dataToValidate = props.target === "BODY"
            ? req.body : props.target === "PARAMS"
                ? req.params : req.query


        const { success, error, data } = props.schema.safeParse(dataToValidate);

        if (!success) {
            const formattedError = error.issues.map((err) => ({
                path: err.path.join('.'),
                message: err.message,
            }
            ))
            return next(new ValidateError(formattedError))
        }

        if (props.target === "BODY") {
            req.validatedBody = data;
        } else if (props.target === "PARAMS") {
            req.validatedParams = data;
        } else if (props.target === "QUERY") {
            req.validatedQuery = data;
        }
        next()

    }
}

export const validateRequestBody = (schema: z.Schema<any>) => {
    return validate({ schema, target: "BODY" })
}
export const validateRequestParams = (schema: z.Schema<any>) => {
    return validate({ schema, target: "PARAMS" })
}
export const validateRequestQuery = (schema: z.Schema<any>) => {
    return validate({ schema, target: "QUERY" })
}