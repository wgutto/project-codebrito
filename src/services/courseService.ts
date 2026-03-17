import type {
    CreateCourseDto,
    UpdateCourseDto,
} from "../config/validators/courseSchema.js"
import { Prisma, type Course } from "../lib/generated/prisma/client.js"
import { prisma } from "../lib/prisma.js"
import { AppError } from "../utils/AppError.js"
import { createService } from "./serviceFactory.js"

const handlePrismaError = (error: unknown): never => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025")
            throw new AppError("Curso não encontrado", 404)
    }
    throw error
}

export const courseService = createService<
    Course,
    CreateCourseDto,
    UpdateCourseDto
>({
    findMany: () => prisma.course.findMany(),
    findUnique: async ({ where }) => {
        const course = await prisma.course.findUnique({ where })

        if(!course) throw new AppError("Curso não encontrado", 404)

        return course
    },
    create: ({ data }) => prisma.course.create({ data }),
    update: ({ where, data }) =>
        prisma.course.update({ where, data }).catch(handlePrismaError),
    delete: ({ where }) =>
        prisma.course.delete({ where }).catch(handlePrismaError),
})
