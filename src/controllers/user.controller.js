import bcrypt from 'bcrypt'
import { prisma } from '../lib/prisma.js'

export const getMe = (req, res) => {
    res.json({user: req.user})
}

export const userUpdate = async (req, res, next) => {
    try {
        const {username, password,info } = req.body
        const userId = req.user?.id

        const updated = {}

        if(username){
            updated.username = username
        }
        if(info) {
            updated.info = info
        }
        if(password) {
            updated.password = await bcrypt.hash(password, 8)
        }

        const updatedUser = await prisma.user.update({
            where: {id: Number(userId)},
            data: updated
        })
        res.json({
            message: "Profile Updated",
            updated: updatedUser
        })
    } catch(err){
        console.log(err)
    }
}