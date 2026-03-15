import type { CreateUserDto, UpdateUserDto,  } from "../config/validators/userSchema.js";
import type { User } from "../lib/generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { createService } from "./serviceFactory.js";

export const userService = createService<User, CreateUserDto, UpdateUserDto>({
    findMany:         ()               => prisma.user.findMany({ where: { deletedAt: null, status: true } }),
    findUnique:       ({ where })      => prisma.user.findUnique({ where: { ...where, deletedAt: null, status: true } }),
    create:           ({ data })       => prisma.user.create({ data }),
    update:           ({ where, data })=> prisma.user.update({ where, data }),
    delete:           ({ where })      => prisma.user.update({ where, data: { deletedAt: new Date() } }),
})

export const restoreUserService = async (id: number) => {
    const restored = await prisma.user.update({
        where: {
            id
        },
        data: {
            deletedAt: null
        }
    })

    return restored
}

export const getAllUsersService = async () => {
    const allUsers = await prisma.user.findMany()

    return allUsers
}