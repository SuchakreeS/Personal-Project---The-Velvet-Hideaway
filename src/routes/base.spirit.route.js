import { Router } from "express";
import { getAllSpirits } from "../controllers/base-spirit.controller.js";

const spiritRoute = Router()

spiritRoute.get('/', getAllSpirits)

export default spiritRoute