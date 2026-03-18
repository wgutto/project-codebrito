import {
    RegistrationStatus,
    UserStatus,
} from "../lib/generated/prisma/client.js"
import type { RegistrationUpdateInput } from "../lib/generated/prisma/models.js"
import { prisma } from "../lib/prisma.js"
import { AppError } from "../utils/AppError.js"

export const getAllRegistrationsService = async () => {
    const data = await prisma.registration.findMany({})

    return data
}

export const getRegistrationsActivesByStudentService = async (id: number) => {
    const data = await prisma.user.findUnique({
        where: {
            id,
            deletedAt: null,
            status: UserStatus.ACTIVE,
        },
        include: {
            registrations: {
                where: {
                    status: RegistrationStatus.REGISTERED,
                },
            },
        },
    })

    if (!data) throw new AppError("Usuário não encontrado", 404)

    return data
}

export const getRegistrationsByStudentService = async (id: number) => {
    const data = await prisma.user.findUnique({
        where: {
            id,
            deletedAt: null,
            status: UserStatus.ACTIVE,
        },
        include: {
            registrations: true,
        },
    })

    if (!data) throw new AppError("Usuário não encontrado", 404)

    return data
}

export const getRegistrationByStudentService = async (
    studentId: number,
    id: number,
) => {
    const data = await prisma.registration.findFirst({
        where: {
            id,
            studentId,
        },
    })

    if (!data) throw new AppError("Matrícula não encontrada", 404)

    return data
}

export const createRegistrationByStudentService = async (
    studentId: number,
    courseId: number,
) => {
    const student = await prisma.user.findUnique({
        where: {
            id: studentId,
        },
        select: {
            id: true,
        },
    })

    if (!student) throw new AppError("Estudante não encontrado", 404)

    const course = await prisma.course.findUnique({
        where: {
            id: courseId,
        },
        select: {
            id: true,
        },
    })

    if (!course) throw new AppError("Curso não encontrado", 404)

    const data = await prisma.registration.create({
        data: {
            studentId,
            courseId,
        },
    })

    return data
}

export const updateRegistrationByStudentService = async (
    studentId: number,
    id: number,
    data: RegistrationUpdateInput,
) => {
    const student = await prisma.user.findUnique({
        where: {
            id: studentId,
        },
        select: {
            id: true,
        },
    })

    if (!student) throw new AppError("Estudante não encontrado", 404)

    const registration = await prisma.registration.findFirst({
        where: {
            studentId,
            id,
        },
    })

    if (!registration) throw new AppError("Matrícula não encontrada", 404)

    const registrationUpdated = await prisma.registration.update({
        where: {
            id,
        },
        data: data,
    })

    return registrationUpdated
}

export const deleteRegistrationByStudentService = async (
    studentId: number,
    id: number,
) => {
    const student = await prisma.user.findUnique({
        where: {
            id: studentId,
        },
        select: {
            id: true,
        },
    })

    if (!student) throw new AppError("Estudante não encontrado", 404)

    const registration = await prisma.registration.findFirst({
        where: {
            studentId,
            id,
        },
    })

    if (!registration) throw new AppError("Matrícula não encontrada", 404)

    const result = await prisma.registration.delete({
        where: {
            id,
        },
    })

    return result
}
