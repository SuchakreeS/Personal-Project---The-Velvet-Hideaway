import createHttpError from 'http-errors'
import { prisma } from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import { registerSchema } from '../validations/schema.js'

export async function register(req, res, next) {
    const { username, email, password, confirmPassword } = req.body

    // Register Validation
    const data = await registerSchema.parseAsync(req.body)

    // Dupe check
    const duped = await prisma.user.findUnique({
        where: {username: data.username}
    })
    if(duped){
        return next(createHttpError[409]('This email is already in used'))
    }


//create user
const result = await prisma.user.create({data : data})
res.json({
    message: "Register Success",
    result : result
})
}

export function login(req, res) {
    res.json({
        msg: "login completed",
        body: req.body
    })
}