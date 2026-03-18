import type { RequestHandler } from "express"
import {
    createCourseSchema,
    updateCourseSchema,
} from "../config/validators/courseSchema.js"
import {
    courseService,
    getAllCoursesFilteredService,
} from "../services/courseService.js"
import { createController } from "./controllerFactory.js"

export const courseController = createController(
    courseService,
    createCourseSchema,
    updateCourseSchema,
)

export const getAllCoursesFilteredController: RequestHandler = async (
    req,
    res,
    next,
) => {
    try {
        const { dataInicio, dataFinal } = req.query as {
            dataInicio: string
            dataFinal: string
        }

        const data = await getAllCoursesFilteredService(dataInicio, dataFinal)

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
