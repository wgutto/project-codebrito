import express from "express"
import { createUserController, deleteUserController, getAllUsersController, getUserController, updateUserController } from "../controllers/users/user-controller.js"

const userRoutes = express.Router()

userRoutes.get("/users", getAllUsersController)
userRoutes.post("/users", createUserController)

userRoutes.get("/users/:id", getUserController)
userRoutes.put("/users/:id", updateUserController)
userRoutes.delete("/users/:id", deleteUserController)

export default userRoutes