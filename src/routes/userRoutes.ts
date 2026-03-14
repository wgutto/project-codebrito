import express from "express"
import { userController } from "../controllers/userController.js"
import { getStudentRegistrationsController } from "../controllers/registrationController.js"

const userRoutes = express.Router()

userRoutes.route("/users")
    .get(userController.getAll)
    .post(userController.create)

userRoutes.route("/users/:id")
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.remove)

userRoutes.get("/users/:id/matriculas", getStudentRegistrationsController)

export default userRoutes
