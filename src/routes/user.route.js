import express from 'express'
import { getMe, userUpdate } from '../controllers/user.controller.js'
import authenticateMiddleware from '../middlewares/authenticate.middleware.js'

const userRoute = express.Router()

userRoute.get('/', authenticateMiddleware, getMe)
userRoute.patch('/edit', authenticateMiddleware, userUpdate)

export default userRoute