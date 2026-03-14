import express from "express"
import { categoryController } from "../controllers/categoryController.js"

const categoryRoutes = express.Router()

categoryRoutes.route("/categories")
    .get(categoryController.getAll)
    .post(categoryController.create)

categoryRoutes.route("/categories/:id")
    .get(categoryController.getById)
    .put(categoryController.update)
    .delete(categoryController.remove)

export default categoryRoutes
