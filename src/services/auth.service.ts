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

    const hashedPassword = hashPassword(password);
    const user = await prisma.user.create(data: { name, email, password: hashedPassword });
    const ACCESS_TOKEN = generateAccessToken({ userId: user.id, email });
    const REFRESH_TOKEN = generateRefreshToken({ userId: user.id, email });

    return {
        user,
        ACCESS_TOKEN,
        REFRESH_TOKEN
    }
}
