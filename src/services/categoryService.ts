import type {
    CreateCategoryDto,
    UpdateCategoryDto,
} from "../config/validators/categorySchema.js"
import { Prisma, type Category } from "../lib/generated/prisma/client.js"
import { prisma } from "../lib/prisma.js"
import { AppError } from "../utils/AppError.js"
import { createService } from "./serviceFactory.js"

const handlePrismaError = (error: unknown): never => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2025")
            throw new AppError("Categoria não encontrada", 404)
    }
    throw error
}

export const categoryService = createService<
    Category,
    CreateCategoryDto,
    UpdateCategoryDto
>({
    findMany: () => prisma.category.findMany(),
    findUnique: async ({ where }) => {
        const category = await prisma.category.findUnique({ where })

        if (!category) throw new AppError("Categoria não encontrada", 404)

        return category
    },
    create: ({ data }) => prisma.category.create({ data }),
    update: ({ where, data }) =>
        prisma.category.update({ where, data }).catch(handlePrismaError),
    delete: ({ where }) =>
        prisma.category.delete({ where }).catch(handlePrismaError),
})
