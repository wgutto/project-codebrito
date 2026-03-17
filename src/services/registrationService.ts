import type {
    CreateRegistrationDto,
    UpdateRegistrationDto,
} from "../config/validators/registrationSchema.js"
import { Prisma, type Registration } from "../lib/generated/prisma/client.js"
import { prisma } from "../lib/prisma.js"
import { AppError } from "../utils/AppError.js"
import { createService } from "./serviceFactory.js"

const handlePrismaError = (error: unknown): never => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025")
            throw new AppError("Matrícula não encontrada", 404)
    }
    throw error
}

export const registrationService = createService<
    Registration,
    CreateRegistrationDto,
    UpdateRegistrationDto
>({
    findMany: () => prisma.registration.findMany(),
    findUnique: async ({ where }) => {
        const registration = await prisma.registration.findUnique({ where })

        if (!registration) throw new AppError("Matrícula não encontrada", 404)

        return registration
    },
    create: ({ data }) =>
        prisma.registration.create({ data }).catch(handlePrismaError),
    update: ({ where, data }) =>
        prisma.registration.update({ where, data }).catch(handlePrismaError),
    delete: ({ where }) =>
        prisma.registration.delete({ where }).catch(handlePrismaError),
})

export const getRegistrationByStudent = async (id: number) => {
    const data = await prisma.user.findUnique({
        where: {
            id,
            deletedAt: null,
        },
        include: {
            registrations: true,
        },
    })

    if (!data) throw new AppError("Usuário não encontrado", 404)

    return data
}
