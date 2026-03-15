import type { RequestHandler } from "express"
import { restoreUserService, userService } from "../services/userService.js"
import { createController } from "./controllerFactory.js"

export const userController = createController(userService)

export const restoreUserController: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id

        const restored = await restoreUserService(Number(id))

        if(!restored) return res.status(404).json({
            message: "Não encontrado"
        })

        return res.status(200).json({
            message: "Usuário restaurado com sucesso"
        })
    } catch (error) {
        next(error)
    }
}