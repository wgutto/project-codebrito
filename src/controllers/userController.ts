import { userService } from "../services/userService.js"
import { createController } from "./controllerFactory.js"

export const userController = createController(userService)