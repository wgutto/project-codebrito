import { prisma } from "../lib/prisma.js"

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