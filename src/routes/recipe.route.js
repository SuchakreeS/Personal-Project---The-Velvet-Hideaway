import { Router } from "express";
import { createRecipe, deletRecipe, getAllRecipes, getUserRecipes, updateRecipe } from "../controllers/recipe.controller.js";
import authenticateMiddleware from "../middlewares/authenticate.middleware.js";

const recipeRoute = Router()

recipeRoute.get('/',getAllRecipes)

recipeRoute.get('/user-recipes', authenticateMiddleware, getUserRecipes)

recipeRoute.post('/', authenticateMiddleware, createRecipe)

recipeRoute.put('/:id', authenticateMiddleware, updateRecipe)

recipeRoute.delete('/:id', authenticateMiddleware, deletRecipe)

export default recipeRoute