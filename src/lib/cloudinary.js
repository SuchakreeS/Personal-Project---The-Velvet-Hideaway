import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export default cloudinary

export const uploadToCloudinary = async (file) => {
    const base64Img = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const response = await cloudinary.uploader.upload(base64Img, {
        folder:'VelvetHideaway',
        resource_type: 'auto'
    })
    return(
        response.secure_url
    )
}