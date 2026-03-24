import express from "express"
import {
    deleteStudentController,
    getAllUsersController,
    restoreStudentController,
    restoreUserController,
    userController,
} from "../controllers/userController.js"
import {
    createRegistrationByStudentController,
    deleteRegistrationByStudentController,
    getRegistrationByStudentAndCountController,
    getRegistrationByStudentController,
    getRegistrationsActivesByStudentController,
    getRegistrationsByStudentController,
    updateRegistrationByStudentController,
} from "../controllers/registrationController.js"

const userRoutes = express.Router()

userRoutes.route("/users").get(userController.getAll).post(userController.create)

userRoutes.get("/users/todos", getAllUsersController)

userRoutes.delete("/users/estudante/:id", deleteStudentController)
userRoutes.put("/users/estudante/:id/restaurar", restoreStudentController)

userRoutes.route("/users/:id").get(userController.getById).put(userController.update).delete(userController.remove)

userRoutes.put("/users/:id/restaurar", restoreUserController)

userRoutes.get("/users/:id/matriculas", getRegistrationsActivesByStudentController)

userRoutes.get("/users/:id/matriculas/todas", getRegistrationsByStudentController)

userRoutes.get("/users/:id/matriculas/confirmadas", getRegistrationByStudentAndCountController)

userRoutes.post("/users/:studentId/matriculas/:courseId", createRegistrationByStudentController)

userRoutes
    .route("/users/:studentId/matriculas/:id")
    .get(getRegistrationByStudentController)
    .put(updateRegistrationByStudentController)
    .delete(deleteRegistrationByStudentController)

export default userRoutes
