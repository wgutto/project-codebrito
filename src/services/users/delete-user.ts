import { prisma } from "../../lib/prisma.js"

export const deleteUserService = async (id: number) => {
    const userDeleted = prisma.user.delete({
        where: {
            id: id
        }
    })

    return userDeleted
}