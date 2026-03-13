import { prisma } from "../../lib/prisma.js"

export const getUserService = async (id: number) => {

    const userFound = await prisma.user.findUnique({
        where: {
            id: id
        }
    })

    return userFound
}