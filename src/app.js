// import express from 'express'
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
// app.use(express.json())

const jsonParser = express.json({ limit: '10mb' });
const urlEncodedParser = express.urlencoded({ limit: '10mb', extended: true });

// ... existing setup ...
app.use(jsonParser);
app.use(urlEncodedParser);

app.options('*', cors({
    origin: [
        "https://personal-project-the-velvet-hideaway-frontend-qm66hbb8m.vercel.app",
        "https://personal-project-the-velvet-hideaway-frontend-ffxcv5y9y.vercel.app",
        process.env.FRONTEND_URL,
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ].filter(Boolean),
    credentials: true,
}));

app.use(cors({
    origin: [
        "https://personal-project-the-velvet-hideaway-frontend-qm66hbb8m.vercel.app",
        "https://personal-project-the-velvet-hideaway-frontend-ffxcv5y9y.vercel.app",
        process.env.FRONTEND_URL,
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ].filter(Boolean),
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    credentials: true,
}));

app.use('/auth', authRoute)
// ... rest of the file ...
app.use('/recipes', recipeRoute)
app.use('/categories', categoryRoute)
app.use('/spirits', spiritRoute)
app.use('/user', userRoute)

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