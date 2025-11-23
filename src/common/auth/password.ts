
import bcrypt from "bcryptjs"

export const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 12)
}

export const comparePasswords = async (password: string, hashedpassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedpassword)
}