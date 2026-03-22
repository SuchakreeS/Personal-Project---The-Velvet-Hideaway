import express from 'express'
import { getMe } from '../controllers/auth.controller.js'
import authenticateMiddleware from '../middlewares/authenticate.middleware.js'

const userRoute = express.Router()

userRoute.get('/', authenticateMiddleware, getMe)

export default userRoute