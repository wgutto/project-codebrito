import type { RequestHandler } from "express";
import { getRegistrationByStudent, registrationService } from "../services/registrationService.js";
import { createController, idSchema } from "./controllerFactory.js";
import { createRegistrationSchema, updateRegistrationSchema } from "../config/validators/registrationSchema.js";

export const registrationController = createController(registrationService, createRegistrationSchema, updateRegistrationSchema)

export const getStudentRegistrationsController: RequestHandler = async (req, res, next) => {
    try {
        const idParsed = idSchema.safeParse(req.params.id)
        if(!idParsed.success) return res.status(400).json({ message: idParsed.error.issues })
        
        const data = await getRegistrationByStudent(Number(idParsed))

        if(!data) return res.status(404).json({
            message: "Não encontrado"
        })

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}