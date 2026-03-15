import type { RequestHandler } from "express"
import { getAllUsersService, restoreUserService, userService } from "../services/userService.js"
import { createController, idSchema } from "./controllerFactory.js"
import { createUserSchema, updateUserSchema } from "../config/validators/userSchema.js"

export const userController = createController(userService, createUserSchema, updateUserSchema)

export const restoreUserController: RequestHandler = async (req, res, next) => {
    try {
        const idParsed = idSchema.safeParse(req.params.id)
        if(!idParsed.success) return res.status(400).json({ message: idParsed.error.issues })

        const restored = await restoreUserService(Number(idParsed))

        return res.status(200).json({
            message: "Usuário restaurado com sucesso"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllUsersController: RequestHandler = async (req, res, next) => {
    try {
        const allUsers = await getAllUsersService()

        return res.status(200).json(allUsers)
    } catch (error) {
        next(error)
    }
}