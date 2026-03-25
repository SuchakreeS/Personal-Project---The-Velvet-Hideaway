import { prisma } from "../lib/prisma.js"

export const getCategories = async (req, res, next) => {
    try{
        const categories = await prisma.category.findMany()
        res.json({
            category: categories
        })
    } catch(err){
        next(err)
    }
}