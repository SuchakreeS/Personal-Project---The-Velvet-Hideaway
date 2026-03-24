import { prisma } from "../lib/prisma.js"

export const getAllRecipes = async (req, res) => {
    const result = await prisma.recipe.findMany({
        orderBy: {createdAt: 'desc'}
    })
}


export const createRecipe = async (req, res) => {
    const {name, ingredients, instructions, image, categoryId, baseSpiritId} = req.body

    const data = {name, ingredients, instructions, image, categoryId, baseSpiritId, userId: req.user.id}

    const result = await prisma.recipe.create({data})

    res.status(201).json({
        message: 'New recipe added',
        result
    })
}
