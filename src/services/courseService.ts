import { CreateCourseDto, UpdateCourseDto } from "validators/courseSchema.js"
import { Prisma, RegistrationStatus, type Course } from "../lib/generated/prisma/client.js"
import { prisma } from "../lib/prisma.js"
import { AppError } from "../utils/AppError.js"
import { createService } from "./serviceFactory.js"

const handlePrismaError = (error: unknown): never => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025") {
            throw new AppError("Curso não encontrado", 404)
        }
    }
    throw error
}

export const courseService = createService<Course, CreateCourseDto, UpdateCourseDto>({
    findMany: () => prisma.course.findMany(),
    findUnique: async ({ where }) => {
        const course = await prisma.course.findUnique({ where })

        if (!course) {
            throw new AppError("Curso não encontrado", 404)
        }

        return course
    },
    create: ({ data }) =>
        prisma.course.create({
            data: data as Prisma.CourseUncheckedCreateInput,
        }),
    update: ({ where, data }) => prisma.course.update({ where, data: data as Prisma.CourseUncheckedUpdateInput }).catch(handlePrismaError),
    delete: ({ where }) => prisma.course.delete({ where }).catch(handlePrismaError),
})

const isValidDateFormat = (date: string): boolean => {
    return /^\d{4}-\d{2}-\d{2}$/.test(date)
}

export const getAllCoursesFilteredService = (dataInicio?: string, dataFinal?: string) => {
    const where: Prisma.CourseWhereInput = {}

    if (dataInicio && !isValidDateFormat(dataInicio)) {
        throw new AppError("dataInicio deve estar no formato YYYY-MM-DD", 400)
    }

    if (dataFinal && !isValidDateFormat(dataFinal)) {
        throw new AppError("dataFinal deve estar no formato YYYY-MM-DD", 400)
    }

    if (dataInicio || dataFinal) {
        where.initialDate = {
            ...(dataInicio && { gte: dataInicio }),
            ...(dataFinal && { lte: dataFinal }),
        }
    }

    return prisma.course.findMany({ where })
}

export const getCoursesCrowdedService = async (min: number) => {
    const data = await prisma.registration.groupBy({
        by: ["courseId"],
        where: {
            status: RegistrationStatus.REGISTERED,
        },
        having: {
            courseId: {
                _count: {
                    gte: min,
                },
            },
        },
    })

    return data
}
