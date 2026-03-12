import express from "express"
import { userController } from "../controllers/users/user-controller.js"

const userRoutes = express.Router()

userRoutes.get("/users", userController)

export default userRoutes