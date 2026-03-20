import express from 'express'
import authRoute from './routes/auth.route.js'
import createHttpError from 'http-errors'

const app = express()
app.use(express.json())

app.use('/auth', authRoute)
app.use('/recipes', (req, res) => {res.send('recipes')})
app.use('/spirits', (req, res) => {res.send('spirits list')})
app.use('/user', (req, res) => {res.send('user')})
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