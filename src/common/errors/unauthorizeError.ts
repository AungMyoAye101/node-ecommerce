import { CustomError } from "./custom-error";

export class UnAuthorizeError extends CustomError {
    statusCode = 401;
    constructor(public message: string) {
        super(message)
    };
    generateErrors() {
        return [{ message: this.message }]
    }
}