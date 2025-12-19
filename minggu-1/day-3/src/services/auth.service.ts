import config from "../utils/env"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import * as authRepository from "../repository/auth.repository"

export const register = async (data: {
    username: string,
    email: string,
    password: string
    role?: string
}) => {
    const existingUser = await authRepository.findByEmail(data.email)
    if (existingUser) {
        throw new Error("Email sudah terdaftar")
    }

    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await authRepository.create({
            name: data.username,
            email: data.email,
            password_hash: hashedPassword,
            role: data.role || "USER"
    })

    return {
        email: user.email,
        username: user.name,
        role: user.role
    }
}

export const login = async (data: { email: string; password: string }) => {
    const user = await authRepository.findByEmail(data.email)
    if (!user) {
        throw new Error("Email atau password salah")
    }

    const isValid = await bcrypt.compare(data.password, user.password_hash)
    if (!isValid) {
        throw new Error("Email atau password salah")
    }

    const token = jwt.sign(
        { id: user.id, role: user.role },
        config
        .JWT_SECRET,
        { expiresIn: '1h' }
    )

    const userReturn = {
        email: user.email,
        username: user.name,
        role: user.role
    }

    return { userReturn, token }
}