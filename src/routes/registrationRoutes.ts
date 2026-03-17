import express from "express"
import { registrationController } from "../controllers/registrationController.js"

const registrationRoutes = express.Router()

registrationRoutes
    .route("/registrations")
    .get(registrationController.getAll)
    .post(registrationController.create)

registrationRoutes
    .route("/registrations/:id")
    .get(registrationController.getById)
    .put(registrationController.update)
    .delete(registrationController.remove)

export default registrationRoutes
