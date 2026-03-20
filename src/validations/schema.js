import {z} from "zod"
import bcrypt from "bcrypt"

// Register Schema
export const registerSchema = z.object({
    email: z.string().email().min(2, "Please input the correct email"),
    username: z.string().min(2, "Please input the username"),
    password: z.string().min(4, "Password must be at least 4 characters"),
    confirmPassword: z.string().min(1, "Please input confirm password")
}).refine(data => data.password === data.confirmPassword, {
    message: "Please check if the confirm password match the password",
    path: ['confirmPassword']
}).transform( async data => {
    const output = {
        email : data.email,
        username : data.username,
        password : await bcrypt.hash(data.password, 8)
    }
    return output
})

// Login Schema
export const loginSchema = z.object({
    email: z.string().email().min(2, ("Please enter valid email")),
    password: z.string().min(4, "Password must be at least 4 characters")
})