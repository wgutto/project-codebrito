import type { RequestHandler } from "express";
import { getRegistrationByStudent, registrationService } from "../services/registrationService.js";
import { createController } from "./controllerFactory.js";

export const registrationController = createController(registrationService)

export const getStudentRegistrationsController: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        const data = await getRegistrationByStudent(Number(id))

        if(!data) return res.status(404).json({
            message: "Não encontrado"
        })

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}