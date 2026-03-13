import type { User } from "../../lib/generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";

export const createUserService = async (userData: User) => {
    const userCreated = await prisma.user.create({
        data: userData
    })

    return userCreated
}