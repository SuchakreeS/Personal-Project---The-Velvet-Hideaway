import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'

export default async function (req, res, next) {
    try {
        const authorization = req.headers.authorization

        // 1. Strict check for "Bearer " (with the space)
        if (!authorization || !authorization.startsWith('Bearer ')) {
            return next(createHttpError[401]("Unauthorized: Invalid Header Format"))
        }

        const token = authorization.split(' ')[1]
        if (!token || token === 'null' || token === 'undefined') {
            return next(createHttpError[401]("No token provided"))
        }

        // 2. Verify Token with try/catch to catch expiration/tampering
        const payload = jwt.verify(token, process.env.JWT_SECRET)

        // 3. Ensure ID is a Number for Prisma
        const userId = Number(payload.id)
        const foundUser = await prisma.user.findUnique({
            where: { id: userId }
        })

        if (!foundUser) {
            return next(createHttpError[401]('User not found'))
        }

        // 4. Remove sensitive data and attach to req
        const { password, createdAt, ...userData } = foundUser
        req.user = userData
        console.log(userData)
        next()
    } catch (err) {
        // This catches "jwt expired" or "invalid signature"
        console.error("JWT Auth Error:", err.message)
        return next(createHttpError[401]("Invalid or expired token"))
    }
}