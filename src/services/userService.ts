import type { CreateUserDto, UpdateUserDto } from "../config/validators/userSchema.js"
import { Prisma, RegistrationStatus, UserStatus, type User } from "../lib/generated/prisma/client.js"
import { prisma } from "../lib/prisma.js"
import { createService } from "./serviceFactory.js"
import { AppError } from "../utils/AppError.js"

const handlePrismaError = (error: unknown): never => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
            throw new AppError("Email ou CPF já cadastrado", 409)
        }
        if (error.code === "P2025") {
            throw new AppError("Usuário não encontrado", 404)
        }
    }
    throw error
}

export const userService = createService<User, CreateUserDto, UpdateUserDto>({
    findMany: () =>
        prisma.user.findMany({
            where: { deletedAt: null, status: UserStatus.ACTIVE },
        }),
    findUnique: async ({ where }) => {
        const user = await prisma.user.findUnique({
            where: { ...where, deletedAt: null, status: UserStatus.ACTIVE },
        })

        if (!user) {
            throw new AppError("Usuário não encontrado", 404)
        }

        return user
    },
    create: ({ data }) => prisma.user.create({ data }).catch(handlePrismaError),
    update: ({ where, data }) => prisma.user.update({ where, data }).catch(handlePrismaError),
    delete: ({ where }) =>
        prisma.user
            .update({
                where,
                data: { deletedAt: new Date(), status: UserStatus.INACTIVE },
            })
            .catch(handlePrismaError),
})

export const deleteStudentService = async (id: number) => {
    const existsUser = await prisma.user.findUnique({
        where: { id },
    })

    if (!existsUser) {
        throw new AppError("Usuário não encontrado", 404)
    }

    return prisma.$transaction(async (tx) => {
        const student = await tx.user.update({
            where: { id },
            data: {
                deletedAt: new Date(),
                status: UserStatus.INACTIVE,
            },
        })

        await tx.registration.updateMany({
            where: { studentId: id },
            data: {
                deletedAt: new Date(),
                status: RegistrationStatus.CANCELLED,
            },
        })

        return student
    })
}

export const restoreUserService = async (id: number, includeRegistrations = false) => {
    const existsUser = await prisma.user.findUnique({
        where: { id },
    })

    if (!existsUser) {
        throw new AppError("Usuário não encontrado", 404)
    }

    return prisma.$transaction(async (tx) => {
        const restored = await tx.user.update({
            where: { id },
            data: {
                deletedAt: null,
                status: UserStatus.ACTIVE,
            },
        })

        if (includeRegistrations) {
            await tx.registration.updateMany({
                where: { studentId: id },
                data: {
                    deletedAt: null,
                    status: RegistrationStatus.REGISTERED,
                },
            })
        }

        return restored
    })
}

export const getAllUsersService = async () => {
    const allUsers = await prisma.user.findMany()

    return allUsers
}
