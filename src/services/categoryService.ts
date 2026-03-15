import type { CreateCategoryDto, UpdateCategoryDto } from "../config/validators/categorySchema.js";
import type { Category } from "../lib/generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { createService } from "./serviceFactory.js";

export const categoryService = createService<Category, CreateCategoryDto, UpdateCategoryDto>({
    findMany:         ()               => prisma.category.findMany(),
    findUnique:       ({ where })      => prisma.category.findUnique({ where }),
    create:           ({ data })       => prisma.category.create({ data }),
    update:           ({ where, data })=> prisma.category.update({ where, data }),
    delete:           ({ where })      => prisma.category.delete({ where }),
})