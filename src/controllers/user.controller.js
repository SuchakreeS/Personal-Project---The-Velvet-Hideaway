import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

export const getMe = (req, res) => {
    // req.user is usually populated by your auth middleware
    res.json({ user: req.user })
}

export const userUpdate = async (req, res, next) => {
    try {
        const { username, password, info, profilePicture } = req.body
        const userId = req.user?.id

        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: No user ID found" })
        }

        const updatedData = {}

        // Handle Username
        if (username) {
            updatedData.username = username
        }

        // Handle Biography (info)
        // We check for undefined so that an empty string "" can still be saved
        if (info !== undefined) {
            updatedData.info = info
        }

        // Handle Avatar
        if (profilePicture !== undefined) {
            updatedData.profilePicture = profilePicture
        }

        // Handle Password Security
        if (password) {
            updatedData.password = await bcrypt.hash(password, 8)
        }

        // Perform Database Update
        const updatedUser = await prisma.user.update({
            where: { id: Number(userId) },
            data: updatedData
        })

        // Remove password from the response object for security
        const { password: _, ...userWithoutPassword } = updatedUser

        res.json({
            message: "Profile Updated",
            updated: userWithoutPassword
        })

    } catch (err) {
        console.error("Update Error:", err)
        // Passes the error to your global error handler
        next(err)
    }
}