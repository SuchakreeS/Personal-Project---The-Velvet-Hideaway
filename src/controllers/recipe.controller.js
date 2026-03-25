import { prisma } from "../lib/prisma.js"
import createHttpError from 'http-errors'

export const getAllRecipes = async (req, res, next) => {
    try {
        const result = await prisma.recipe.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                category: true,
                basespirit: true,
                user: {
                    select: {
                        username: true,
                        profilePicture: true
                    }
                }
            }
        });

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const getUserRecipes = async (req, res, next) => {
    try {
        const userId = req.user.id
        const result = await prisma.recipe.findMany({
            where: {
                userId : userId
            },
            orderBy: {
                createdAt: 'desc'
            },
            include: {
                category: true,
                basespirit: true,
                user: {
                    select: {
                        username: true
                    }
                }
            }
        })
        res.json(result)
    } catch(err) {
        next(err)
    }
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


export const updateRecipe = async (req, res, next) => {
    const {id} = req.params
    const {name, ingredients, instructions, image, categoryId, baseSpiritId} = req.body

    const foundRecipe = await prisma.recipe.findUnique({
        where: {id : +id}
    })
    if(!foundRecipe || req.user.id !== foundRecipe.userId){
        return next(createHttpError[400]("Cannot Edit!"))
    }

    const result = await prisma.recipe.update({
        where: {id: +id},
        data: {name, ingredients, instructions, image, categoryId, baseSpiritId}
    })
    res.json({
        message: "Recipe Updated",
        recipe: result
    })
}

export const deletRecipe = async (req, res, next) => {
    const {id} = req.params
    const foundRecipe = await prisma.recipe.findUnique({
        where: {id : +id}
    })
    if(!foundRecipe || req.user.id !== foundRecipe.userId){
        return next(createHttpError[400]("Cannot Delete Recipe"))
    }

    const result = await prisma.recipe.delete({
        where: {id: +id}
    })
    res.json({
        message: "Recipe deleted"
    })
}