import express from 'express'
import { chatWithAi } from '../controllers/ai.controller.js'
import authenticateMiddleware from '../middlewares/authenticate.middleware.js'

const aiRoute = express.Router()

// Only registered members can talk to the Archivist
aiRoute.post('/chat', authenticateMiddleware, chatWithAi);

export default aiRoute