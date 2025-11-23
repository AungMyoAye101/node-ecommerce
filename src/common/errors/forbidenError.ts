import { CustomError } from "./custom-error";

export class ForbidenError extends CustomError {
    statusCode = 403;
    constructor(public message: string) {
        super(message)
    };
    generateErrors() {
        return [{ message: this.message }]
    }
}