import express from 'express'
import { createCategory, deleteCategory, getCategories, updateCategory } from '../controllers/category.controller.js'
import authenticateMiddleware from '../middlewares/authenticate.middleware.js'
import { adminCheck } from '../middlewares/admin.authen.midlleware.js'

const categoryRoute = express.Router()

categoryRoute.get('/', getCategories)
categoryRoute.post('/',authenticateMiddleware, adminCheck, createCategory)
categoryRoute.put('/:id',authenticateMiddleware, adminCheck, updateCategory)
categoryRoute.delete('/:id',authenticateMiddleware, adminCheck, deleteCategory)

export default categoryRoute