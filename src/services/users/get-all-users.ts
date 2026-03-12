import { prisma } from "../../lib/prisma.js"

export const getAllUsers = async () => {
    const allUsers = await prisma.user.findMany({})

    return allUsers
}