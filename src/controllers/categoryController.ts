import { createCategorySchema, updateCategorySchema } from "validators/categorySchema.js"
import { categoryService } from "../services/categoryService.js"
import { createController } from "./controllerFactory.js"

export const categoryController = createController(categoryService, createCategorySchema, updateCategorySchema)
