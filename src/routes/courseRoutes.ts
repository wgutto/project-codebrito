import express from "express"
import { courseController, getAllCoursesFilteredController, getCoursesCrowdedController } from "../controllers/courseController.js"

const courseRoutes = express.Router()

courseRoutes.route("/cursos").get(getAllCoursesFilteredController).post(courseController.create)

courseRoutes.get("/cursos/lotados", getCoursesCrowdedController)

courseRoutes.route("/cursos/:id").get(courseController.getById).put(courseController.update).delete(courseController.remove)

export default courseRoutes
