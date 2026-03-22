import express from 'express'
import { getMe, login, register } from '../controllers/auth.controller.js'

const authRoute = express.Router()


authRoute.post('/register', register)

authRoute.post('/login',login)

export default authRoute