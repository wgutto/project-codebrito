import type { RequestHandler } from "express";
import { getRegistrationByStudent } from "../services/registrationService.js";
import { createService } from "../services/serviceFactory.js";
import type { RegistrationUncheckedCreateInput, RegistrationUpdateInput } from "../lib/generated/prisma/models.js";
import type { Registration } from "../lib/generated/prisma/client.js";
import { prisma } from "../lib/prisma.js";
import { createController } from "./controllerFactory.js";

const registrationService = createService<Registration, RegistrationUncheckedCreateInput, RegistrationUpdateInput>({
    findMany:         ()               => prisma.registration.findMany(),
    findUnique:       ({ where })      => prisma.registration.findUnique({ where }),
    create:           ({ data })       => prisma.registration.create({ data }),
    update:           ({ where, data })=> prisma.registration.update({ where, data }),
    delete:           ({ where })      => prisma.registration.delete({ where }),
})

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