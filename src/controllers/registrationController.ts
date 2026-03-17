import type { RequestHandler } from "express"
import {
    getRegistrationByIdService,
    getRegistrationByStudentService,
    registrationService,
} from "../services/registrationService.js"
import { createController, idSchema } from "./controllerFactory.js"
import {
    createRegistrationSchema,
    updateRegistrationSchema,
} from "../config/validators/registrationSchema.js"

export const registrationController = createController(
    registrationService,
    createRegistrationSchema,
    updateRegistrationSchema,
)

export const getStudentRegistrationsController: RequestHandler = async (
    req,
    res,
    next,
) => {
    try {
        const idParsed = idSchema.parse(req.params.id)

        const data = await getRegistrationByStudentService(idParsed)

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const getRegistrationByIdController: RequestHandler = async (
    req,
    res,
    next,
) => {
    try {
        const { studentId, id } = req.params

        const studentIdParsed = idSchema.parse(studentId)
        const idParsed = idSchema.parse(id)

        const data = await getRegistrationByIdService(studentIdParsed, idParsed)

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
