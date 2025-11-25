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

    const hashed = await hashPassword(password);


    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashed,
            role: 'user'
        },
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
        }
    })
    const access_token = await generateAccessToken({ userId: user.id, email: user.email, role: user.role })
    const refresh_token = await generateRefreshToken({ userId: user.id, email: user.email, role: user.role })

    return {
        user,
        refresh_token,
        access_token,
    }
}
