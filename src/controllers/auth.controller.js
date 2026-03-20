import createHttpError from 'http-errors'
import { prisma } from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import { loginSchema, registerSchema } from '../validations/schema.js'
import jwt from 'jsonwebtoken'

export async function register(req, res, next) {
    const { username, email, password, confirmPassword } = req.body

    // Register Validation
    const data = await registerSchema.parseAsync(req.body)

    // Dupe check
    const duped = await prisma.user.findUnique({
        where: {email: data.email}
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


// Login controller
export async function login(req, res, next) {
    // Validation
    const data = loginSchema.parse(req.body)
    
    // Find User
    const foundUser = await prisma.user.findUnique({
        where: {email : data.email}
    })
    if(!foundUser){
        return next(createHttpError[409]("No user found"))
    }

    // Check password
    let passCorrect = await bcrypt.compare(data.password, foundUser.password)
    if (!passCorrect){
        return next(createHttpError[401]("Login failed"))
    }

    // Token create
    const payload = {id: foundUser.id}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '15d'
    })
    res.json({
        message: "login Success",
        user: foundUser.username,
        token : token
    })
} 