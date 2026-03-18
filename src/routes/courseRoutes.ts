import express from "express"
import {
    courseController,
    getAllCoursesFilteredController,
} from "../controllers/courseController.js"

const courseRoutes = express.Router()

courseRoutes
    .route("/courses")
    .get(getAllCoursesFilteredController)
    .post(courseController.create)

courseRoutes
    .route("/courses/:id")
    .get(courseController.getById)
    .put(courseController.update)
    .delete(courseController.remove)

export default courseRoutes
