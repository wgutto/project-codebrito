import express from "express"
import {
    getAllUsersController,
    restoreUserController,
    userController,
} from "../controllers/userController.js"
import {
    createRegistrationByStudentController,
    deleteRegistrationByStudentController,
    getRegistrationByStudentController,
    getRegistrationsActivesByStudentController,
    getRegistrationsByStudentController,
    updateRegistrationByStudentController,
} from "../controllers/registrationController.js"

const userRoutes = express.Router()

userRoutes
    .route("/users")
    .get(userController.getAll)
    .post(userController.create)

userRoutes.get("/users/todos", getAllUsersController)

userRoutes
    .route("/users/:id")
    .get(userController.getById)
    .put(userController.update)
    .delete(userController.remove)

userRoutes.patch("/users/:id/restaurar", restoreUserController)

userRoutes.get(
    "/users/:id/matriculas",
    getRegistrationsActivesByStudentController,
)
userRoutes.get(
    "/users/:id/matriculas/todas",
    getRegistrationsByStudentController,
)

userRoutes.post(
    "/users/:studentId/matriculas/:courseId",
    createRegistrationByStudentController,
)

userRoutes
    .route("/users/:studentId/matriculas/:id")
    .get(getRegistrationByStudentController)
    .put(updateRegistrationByStudentController)
    .delete(deleteRegistrationByStudentController)

export default userRoutes
