import type { RequestHandler } from "express"
import {
    createRegistrationByStudentService,
    deleteRegistrationByStudentService,
    getAllRegistrationsService,
    getRegistrationByStudentAndCountService,
    getRegistrationByStudentService,
    getRegistrationsActivesByStudentService,
    getRegistrationsByStudentService,
    updateRegistrationByStudentService,
} from "../services/registrationService.js"
import { idSchema } from "./controllerFactory.js"
import { updateRegistrationSchema } from "../config/validators/registrationSchema.js"

export const getAllRegistrationsController: RequestHandler = async (_req, res, next) => {
    try {
        const data = await getAllRegistrationsService()

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const getRegistrationsActivesByStudentController: RequestHandler = async (req, res, next) => {
    try {
        const idParsed = idSchema.parse(req.params.id)

        const data = await getRegistrationsActivesByStudentService(idParsed)

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const getRegistrationsByStudentController: RequestHandler = async (req, res, next) => {
    try {
        const idParsed = idSchema.parse(req.params.id)

        const data = await getRegistrationsByStudentService(idParsed)

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const getRegistrationByStudentController: RequestHandler = async (req, res, next) => {
    try {
        const { studentId, id } = req.params

        const studentIdParsed = idSchema.parse(studentId)
        const idParsed = idSchema.parse(id)

        const data = await getRegistrationByStudentService(studentIdParsed, idParsed)

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

export const getRegistrationByStudentAndCountController: RequestHandler = async (req, res, next) => {
    try {
        const id = req.params.id

        const idParsed = idSchema.parse(id)

        const data = await getRegistrationByStudentAndCountService(idParsed)

        return res.status(200).json({
            user: data.student,
            count: data.count,
            registrations: data.newData,
        })
    } catch (error) {
        next(error)
    }
}

export const createRegistrationByStudentController: RequestHandler = async (req, res, next) => {
    try {
        const { studentId, courseId } = req.params

        const studentIdParsed = idSchema.parse(studentId)
        const courseIdParsed = idSchema.parse(courseId)

        const data = await createRegistrationByStudentService(studentIdParsed, courseIdParsed)

        return res.status(201).json(data)
    } catch (error) {
        next(error)
    }
}

export const updateRegistrationByStudentController: RequestHandler = async (req, res, next) => {
    try {
        const { studentId, id } = req.params
        const body = req.body

        const studentIdParsed = idSchema.parse(studentId)
        const idParsed = idSchema.parse(id)
        const bodyParsed = updateRegistrationSchema.parse(body)

        const registrationUpdated = await updateRegistrationByStudentService(studentIdParsed, idParsed, bodyParsed)

        return res.status(200).json(registrationUpdated)
    } catch (error) {
        next(error)
    }
}

export const deleteRegistrationByStudentController: RequestHandler = async (req, res, next) => {
    try {
        const { studentId, id } = req.params

        const studentIdParsed = idSchema.parse(studentId)
        const idParsed = idSchema.parse(id)

        await deleteRegistrationByStudentService(studentIdParsed, idParsed)

        return res.status(200).json({
            message: "Matrícula deletada com sucesso",
        })
    } catch (error) {
        next(error)
    }
}
