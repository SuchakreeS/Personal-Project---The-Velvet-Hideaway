import createHttpError from 'http-errors'
import { prisma } from '../lib/prisma.js'
import bcrypt from 'bcrypt'

export async function register(req, res, next) {
    const { username, email, password, confirmPassword } = req.body

    // Register Validation
    if (!username.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
        return next(createHttpError[400]("Please Fill all the form"))
    }
    if (confirmPassword !== password) {
        return next(createHttpError[400]("Please check the password and confim password"))
    }

    // Check duplicate
    const dupeCheck = await prisma.user.findUnique({
        where: { email: email }
    })
    if (dupeCheck) {
        return next(createHttpError[409]("This user has already registered"))
    }
const newUser = {
    email : email,
    password : await bcrypt.hash(password, 10),
    username : username
}
const result = await prisma.user.create({data : newUser})
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