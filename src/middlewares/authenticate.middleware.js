import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma.js'

export default async function (req, res, next) {
    const authorization = req.headers.authorization

    // Headers authorization check
    if(!authorization || !authorization.startsWith('Bearer')) {
        throw(createHttpError[401]("Unauthorized"))
    }
    const token = authorization.split(' ')[1]
    if(!token) {
        throw(createHttpError[401]("No token"))
    }

    // Verify Token
    const payload = jwt.verify(token, process.env.JWT_SECRET)

    // Use payload.id to find user
    const foundUser = await prisma.user.findUnique({
        where:{id: payload.id}
    })
    if(!foundUser) {
        throw(createHttpError[401]('Unauthorized FoundUser'))
    }

    // Rip pw and created off data
    const {password, createdAt,...userData} = foundUser
    req.user = userData
    next()
}