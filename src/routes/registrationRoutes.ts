import express from "express"
import { getAllRegistrationsController } from "../controllers/registrationController.js"

const registrationRoutes = express.Router()

registrationRoutes.get("/matriculas", getAllRegistrationsController)

export default registrationRoutes
