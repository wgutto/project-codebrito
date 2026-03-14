import { courseService } from "../services/courseService.js"
import { createController } from "./controllerFactory.js"

export const courseController = createController(courseService)