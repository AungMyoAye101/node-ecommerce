

import "express";
export interface TokenPayload {
    userId: string,
    email: string,
    role: UserRole
}

declare global {
    namespace Express {
        interface Request {
            user?: TokenPayload,
            validatedBody?: any,
            validatedParams?: any,
            validatedQuery?: any,
        }
    }
}

