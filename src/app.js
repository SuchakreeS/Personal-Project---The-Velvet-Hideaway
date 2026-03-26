import express from 'express'
import authRoute from './routes/auth.route.js'
import createHttpError from 'http-errors'
import userRoute from './routes/user.route.js'
import cors from 'cors'
import recipeRoute from './routes/recipe.route.js'
import categoryRoute from './routes/category.route.js'
import spiritRoute from './routes/base.spirit.route.js'
// import categoryRoute from './routes/category.route.js'

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));

app.use('/auth', authRoute)
app.use('/recipes', recipeRoute)
app.use('/categories', categoryRoute)
app.use('/spirits', spiritRoute)
app.use('/user', userRoute)
app.use('/admin', (req, res) => {res.send('Admin')})

app.use( (req, res, next) => {
    return next (createHttpError.NotFound())
})

app.use( (err ,req, res, next) => {
    console.error(err)
    res.status(err.status || 500)
    res.json ({
        status: err.status || 500,
        message: err.message || 'Internal server error'
    })
})

export default app