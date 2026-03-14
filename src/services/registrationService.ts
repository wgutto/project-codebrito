import type { Registration } from "../lib/generated/prisma/client.js"
import type { RegistrationUncheckedCreateInput, RegistrationUpdateInput } from "../lib/generated/prisma/models.js"
import { prisma } from "../lib/prisma.js"
import { createService } from "./serviceFactory.js"

export const registrationService = createService<Registration, RegistrationUncheckedCreateInput, RegistrationUpdateInput>({
    findMany:         ()               => prisma.registration.findMany(),
    findUnique:       ({ where })      => prisma.registration.findUnique({ where }),
    create:           ({ data })       => prisma.registration.create({ data }),
    update:           ({ where, data })=> prisma.registration.update({ where, data }),
    delete:           ({ where })      => prisma.registration.delete({ where }),
})

export const getRegistrationByStudent = async (id: number) => {
    const data = await prisma.user.findUnique({
        where: {
            id
        },
        include: {
            registrations: true
        }
    })

    return data
}