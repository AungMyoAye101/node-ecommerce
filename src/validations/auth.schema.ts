import * as z from "zod";
import { UserRole } from "../../generated/prisma/enums";


export const registerSchema = z.object({
    name:
        z.string()
            .min(3, "Name must be at least 3 characters long."),
    email:
        z.email("Invalid email."),
    password:
        z.string("Password is requried.")
            .min(6, "Password must be at least 6 characters long."),
    role: z.enum(UserRole, "User must one of 'user','admin' or 'staff'.").default('user')
})

export const loginSchema = z.object({
    email:
        z.email("Invalid email."),
    password:
        z.string("Password is requried.")
            .min(6, "Password must be at least 6 characters long.")
})


export const IDSchmea = z.object({
    id: z.uuid()
})
export type registerType = z.infer<typeof registerSchema>
export type loginType = z.infer<typeof loginSchema>
