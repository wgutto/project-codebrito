import type { UserUpdateInput } from "../../lib/generated/prisma/models.js";
import { prisma } from "../../lib/prisma.js";

export const updateUserService = async (id: number, dataToUpdate: UserUpdateInput) => {
    const userUpdated = await prisma.user.update({
        data: dataToUpdate,
        where: {
            id: id
        }
    })

    return userUpdated
}