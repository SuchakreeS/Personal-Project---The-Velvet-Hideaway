import { Router } from "express";
import { createSpirit, deleteSpirit, getAllSpirits, updateSpirit } from "../controllers/base-spirit.controller.js";
import { adminCheck } from "../middlewares/admin.authen.midlleware.js";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";

const spiritRoute = Router()

spiritRoute.get('/', getAllSpirits)
spiritRoute.post('/', authenticateMiddleware ,adminCheck, createSpirit)
spiritRoute.put('/:id', authenticateMiddleware ,adminCheck, updateSpirit)
spiritRoute.delete('/:id', authenticateMiddleware ,adminCheck, deleteSpirit)

export default spiritRoute