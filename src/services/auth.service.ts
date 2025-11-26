import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../common/auth/jwt"
import { comparePasswords, hashPassword } from "../common/auth/password"
import { BadRequestError, NotFoundError, UnAuthorizeError } from "../common/errors"
import { prisma } from "../lib/prisma"
import { TokenPayload } from "../types"
import { loginType, registerType } from "../validations/auth.schema"

export const registerService = async ({
    name,
    email,
    password
}: registerType) => {
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
    const updateUser = await prisma.user.update({
        where: { id: user.id },
        data: { token: refresh_token },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            created_at: true,
            updated_at: true,
        }
    })

    return {
        user: updateUser,
        refresh_token,
        access_token,
    }
}

//account login service 
export const loginService = async ({
    email,
    password
}: loginType
) => {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new NotFoundError("User not found.")
    }
    const compare = await comparePasswords(password, user.password);
    if (!compare) {
        throw new UnAuthorizeError("Invalid credientel");
    }
    const access_token = await generateAccessToken({ userId: user.id, email: user.email, role: user.role })
    const refresh_token = await generateRefreshToken({ userId: user.id, email: user.email, role: user.role })
    //update token 

    const updateUser = await prisma.user.update({
        where: { id: user.id },
        data: { token: refresh_token },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            created_at: true,
            updated_at: true,
        }
    })


    return {
        user: updateUser,
        access_token,
        refresh_token
    }

}

export const logoutService = async (
    userId: string
) => {
    return await prisma.user.update({
        where: { id: userId },
        data: {
            token: null
        }
    });
}

export const refreshTokenService = async (token: string) => {
    const decoded = verifyRefreshToken(token);
    if (!decoded) {
        throw new UnAuthorizeError("Your are not authorized,")
    }
    const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        select: {
            id: true,
            token: true,
            email: true,
            role: true
        }
    })
    if (!user || user.token !== token) {
        throw new UnAuthorizeError("Invalid token.")
    }
    const tokenPayload: TokenPayload = {
        userId: user.id,
        email: user.email,
        role: user.role
    }
    const access_token = await generateAccessToken(tokenPayload);
    const refresh_token = await generateRefreshToken(tokenPayload);

    await prisma.user.update({
        where: { id: user.id },
        data: { token: refresh_token }
    })
    return { access_token, refresh_token }
}