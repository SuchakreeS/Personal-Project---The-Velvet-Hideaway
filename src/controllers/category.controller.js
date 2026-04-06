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

export const createCategory = async (req, res, next) => {
    try{
        const {name, details} = req.body
        const category = await prisma.category.create({
            data: {name, details}
        })
        console.log(name)
        res.json(category)
    } catch(err){
        console.log(err, "create Category error")
    }
}

export const updateCategory = async (req, res, next) => {
    try{
        const {id} = req.params
        const {name, details} = req.body
        const result = await prisma.category.update({
            where:{id: +id},
            data: {name, details}
        })
        res.send(result)
    } catch(err){
        console.log(err, "Update Cat")
    }
}

export const deleteCategory = async (req, res, next) => {
    try{
        const {id} = req.params
        await prisma.category.delete({
            where: {id: +id}
        })
        res.json({
            message: "category deleted"
        })
    } catch(err){
        console.log(err, "Delete Cat")
    }
}