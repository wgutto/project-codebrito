import type { Category } from "../lib/generated/prisma/client.js"
import type { CategoryUncheckedCreateInput, CategoryUpdateInput } from "../lib/generated/prisma/models.js"
import { prisma } from "../lib/prisma.js"
import { createService } from "../services/serviceFactory.js"
import { createController } from "./controllerFactory.js"

const categoryService = createService<Category, CategoryUncheckedCreateInput, CategoryUpdateInput>({
    findMany:         ()               => prisma.category.findMany(),
    findUnique:       ({ where })      => prisma.category.findUnique({ where }),
    create:           ({ data })       => prisma.category.create({ data }),
    update:           ({ where, data })=> prisma.category.update({ where, data }),
    delete:           ({ where })      => prisma.category.delete({ where }),
})

export const categoryController = createController(categoryService)