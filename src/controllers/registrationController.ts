import type { RequestHandler } from "express";
import { getRegistrationByStudent, registrationService } from "../services/registrationService.js";
import { createController, idSchema } from "./controllerFactory.js";
import { createRegistrationSchema, updateRegistrationSchema } from "../config/validators/registrationSchema.js";
import { AppError } from "../utils/AppError.js";

export const registrationController = createController(registrationService, createRegistrationSchema, updateRegistrationSchema)

export const getStudentRegistrationsController: RequestHandler = async (req, res, next) => {
    try {
        const idParsed = idSchema.parse(req.params.id)
        
        const data = await getRegistrationByStudent(Number(idParsed))

        if(!data) return next(new AppError("Estudante não encontrado", 404))

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}