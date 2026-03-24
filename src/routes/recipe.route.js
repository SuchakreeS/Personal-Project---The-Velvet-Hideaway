import { Router } from "express";
import { createRecipe } from "../controllers/recipe.controller.js";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";

const recipeRoute = Router()

recipeRoute.get('/', (req, res) => {
    res.send("Recipe route get")
})

recipeRoute.post('/', authenticateMiddleware,createRecipe)

export default recipeRoute