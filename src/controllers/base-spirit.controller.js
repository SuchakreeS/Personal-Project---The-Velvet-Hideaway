import { prisma } from "../lib/prisma.js";


export const getAllSpirits = async (req, res, next) => {
    try {
        const spirits = await prisma.basespirit.findMany();
        res.json(spirits);
    } catch (error) {
        next(error);
    }
};