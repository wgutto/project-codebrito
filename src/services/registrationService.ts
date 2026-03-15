import type { CreateRegistrationDto, UpdateRegistrationDto } from "../config/validators/registrationSchema.js"
import type { Registration } from "../lib/generated/prisma/client.js"
import { prisma } from "../lib/prisma.js"
import { createService } from "./serviceFactory.js"

export const registrationService = createService<Registration, CreateRegistrationDto, UpdateRegistrationDto>({
    findMany:         ()               => prisma.registration.findMany(),
    findUnique:       ({ where })      => prisma.registration.findUnique({ where }),
    create:           ({ data })       => prisma.registration.create({ data }),
    update:           ({ where, data })=> prisma.registration.update({ where, data }),
    delete:           ({ where })      => prisma.registration.delete({ where }),
})

export const getRegistrationByStudent = async (id: number) => {
    const data = await prisma.user.findUnique({
        where: {
            id,
            deletedAt: null
        },
        include: {
            registrations: true
        }
    })

    return data
}