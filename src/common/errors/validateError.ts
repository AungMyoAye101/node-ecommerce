import { CustomError } from "./custom-error";

interface ValidateErrorDetails {
    path: string,
    message: string
}

export class ValidateError extends CustomError {
    statusCode = 400;
    constructor(public details: ValidateErrorDetails[]) {
        super("Validation error.")
    }
    generateErrors() {
        return this.details.map((detail) => ({
            message: detail.message,
            fileds: detail.path
        }))
    }
}