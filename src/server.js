import dotenv from "dotenv"
import app from "./app.js"
import cloudinary from "./lib/cloudinary.js"

dotenv.config()
cloudinary.config()

const PORT = process.env.PORT || 8000


app.listen(PORT, () => console.log(`server running on port ${PORT}`))