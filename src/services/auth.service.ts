import { generateAccessToken, generateRefreshToken } from "../common/auth/jwt"
import { hashPassword } from "../common/auth/password"
import { BadRequestError } from "../common/errors"
import { prisma } from "../lib/prisma"
import { registerType } from "../validations/auth.schema"

export const registerService = async ({ name, email, password }: registerType) => {
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        throw new BadRequestError("Email already exist.")
    }

    const hashedPassword = await hashPassword(password);



    return {
        hashedPassword
    }
}
