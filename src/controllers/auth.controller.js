import createHttpError from 'http-errors'
import { prisma } from '../lib/prisma.js'
import bcrypt from 'bcrypt'
import { loginSchema, registerSchema } from '../validations/schema.js'
import jwt from 'jsonwebtoken'

export async function register(req, res, next) {
    try {
        const validatedData = await registerSchema.parseAsync(req.body);
 
        const duped = await prisma.user.findUnique({
            where: { email: validatedData.email }
        });
        
        if (duped) {
            return next(createHttpError[409]('This email is already in use'));
        }

        const hashedPassword = await bcrypt.hash(validatedData.password, 10);
        const result = await prisma.user.create({ 
            data: {
                username: validatedData.username,
                email: validatedData.email,
                password: hashedPassword,
                role: "USER"
            }
        });

        res.json({
            message: "Register Success",
            result: { id: result.id, username: result.username, email: result.email }
        });

    } catch (err) {
        next(err);
    }
}


// Login controller
export async function login(req, res, next) {
    // Validation
    const data = loginSchema.parse(req.body)

    // Find User
    const foundUser = await prisma.user.findUnique({
        where: { email: data.email }
    })
    if (!foundUser) {
        return next(createHttpError[409]("No user found"))
    }

    // Check password
    let passCorrect = await bcrypt.compare(data.password, foundUser.password)
    if (!passCorrect) {
        return next(createHttpError[401]("Login failed"))
    }

    // Token create
    const payload = { id: foundUser.id, role: foundUser.role || "USER"}
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        algorithm: 'HS256',
        expiresIn: '15d'
    })
    res.json({
            message: "login Success",
            token: token,
            user: {
                id: foundUser.id,
                username: foundUser.username,
                role: foundUser.role
            }
        })
    console.log(foundUser.role)
} 
