import express from "express"
import { courseController } from "../controllers/courseController.js"

const courseRoutes = express.Router()

courseRoutes.route("/courses")
    .get(courseController.getAll)
    .post(courseController.create)

courseRoutes.route("/courses/:id")
    .get(courseController.getById)
    .put(courseController.update)
    .delete(courseController.remove)

export default courseRoutes
