import type { RequestHandler } from "express"
import { deleteStudentService, getAllUsersService, restoreUserService, userService } from "../services/userService.js"
import { createController, idSchema } from "./controllerFactory.js"
import { createUserSchema, updateUserSchema } from "validators/userSchema.js"

export const userController = createController(userService, createUserSchema, updateUserSchema)

export const deleteStudentController: RequestHandler = async (req, res, next) => {
    try {
        const idParsed = idSchema.parse(req.params.id)

        const studentDeleted = await deleteStudentService(idParsed)

        return res.status(200).json(studentDeleted)
    } catch (error) {
        next(error)
    }
}

export const restoreStudentController: RequestHandler = async (req, res, next) => {
    try {
        const idParsed = idSchema.parse(req.params.id)

        await restoreUserService(idParsed, true)

        return res.status(200).json({
            message: "Estudante restaurado com sucesso",
        })
    } catch (error) {
        next(error)
    }
}

export const restoreUserController: RequestHandler = async (req, res, next) => {
    try {
        const idParsed = idSchema.parse(req.params.id)

        await restoreUserService(idParsed)

        return res.status(200).json({
            message: "Usuário restaurado com sucesso",
        })
    } catch (error) {
        next(error)
    }
}

export const getAllUsersController: RequestHandler = async (_req, res, next) => {
    try {
        const allUsers = await getAllUsersService()

        return res.status(200).json(allUsers)
    } catch (error) {
        next(error)
    }
}
