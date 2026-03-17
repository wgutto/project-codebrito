import type {
    CreateUserDto,
    UpdateUserDto,
} from "../config/validators/userSchema.js"
import { Prisma, type User } from "../lib/generated/prisma/client.js"
import { prisma } from "../lib/prisma.js"
import { createService } from "./serviceFactory.js"
import { AppError } from "../utils/AppError.js"

const handlePrismaError = (error: unknown): never => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002")
            throw new AppError("Email ou CPF já cadastrado", 409)
        if (error.code === "P2025")
            throw new AppError("Usuário não encontrado", 404)
    }
    throw error
}

export const userService = createService<User, CreateUserDto, UpdateUserDto>({
    findMany: () =>
        prisma.user.findMany({ where: { deletedAt: null, status: true } }),
    findUnique: async ({ where }) => {
        const user = await prisma.user.findUnique({
            where: { ...where, deletedAt: null, status: true },
        })

        if (!user) throw new AppError("Usuário não encontrado", 404)

        return user
    },
    create: ({ data }) => prisma.user.create({ data }).catch(handlePrismaError),
    update: ({ where, data }) =>
        prisma.user.update({ where, data }).catch(handlePrismaError),
    delete: ({ where }) =>
        prisma.user
            .update({ where, data: { deletedAt: new Date() } })
            .catch(handlePrismaError),
})

export const restoreUserService = async (id: number) => {
    const existsUser = await prisma.user.findUnique({
        where: {
            id,
        },
    })

    if (!existsUser) throw new AppError("Usuário não encontrado", 404)

    const restored = await prisma.user.update({
        where: {
            id,
        },
        data: {
            deletedAt: null,
        },
    })

    return restored
}

export const getAllUsersService = async () => {
    const allUsers = await prisma.user.findMany()

    return allUsers
}
