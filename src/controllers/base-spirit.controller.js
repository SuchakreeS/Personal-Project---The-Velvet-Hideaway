import { prisma } from "../lib/prisma.js";
import cloudinary, { uploadToCloudinary } from "../lib/cloudinary.js";


export const getAllSpirits = async (req, res, next) => {
    try {
        const spirits = await prisma.basespirit.findMany();
        res.json(spirits);
    } catch (error) {
        next(error);
    }
};

export const createSpirit = async (req, res, next) => {
    try {
        const { name, details, image } = req.body;
        let imgUrl = image;

        if (image && image.startsWith('data:image')) {
            const uploadRes = await cloudinary.uploader.upload(image, {
                folder: "VelvetHideaway"
            });
            imgUrl = uploadRes.secure_url;
        }

        const spirit = await prisma.basespirit.create({
            data: { 
                name, 
                details, 
                image: imgUrl,
                // userId: req.user.id // Keep this ONLY if your Schema has a userId field
            }
        });
        
        res.status(201).json(spirit);
    } catch (err) {
        console.error("Full Error:", err); // Look at your terminal!
        res.status(500).json({ message: "Failed to create spirit", error: err.message });
    }
};

export const updateSpirit = async (req, res) => {
    try {
        const { id } = req.params
        const { name, details, image } = req.body
        const updatedData = {}
        if(name){
            updatedData.name = name
        }
        if(details){
            updatedData.details = details
        }
        if(image){
            updatedData.image = image
        }
        const result = await prisma.basespirit.update({
    where: { id: +id },
    data: { 
        name: name || undefined, 
        details: details || undefined, 
        image: imgUrl || undefined // Make sure to use the uploaded URL here too!
    }
})
        res.send(result)
    } catch(err){
        console.log(err, "updateSpirit")
    }
}

export const deleteSpirit = async (req, res) => {
    try {
        const {id} = req.params
        await prisma.basespirit.delete({
            where: {id: +id}
        })
        res.json({
            message: "Deleted"
        })
    } catch(err){
        console.log(err, "DeleteSpirit")
    }
}