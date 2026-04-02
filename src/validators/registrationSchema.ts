import { RegistrationStatus } from "lib/generated/prisma/enums"
import z from "zod"

export const createRegistrationSchema = z.object({
    studentId: z.number({
        error: "É obrigatório identificar um estudante para matricular",
    }),
    courseId: z.number({
        error: "É obrigatório identificar um curso para matricular",
    }),
    status: z
        .enum([RegistrationStatus.REGISTERED, RegistrationStatus.CANCELLED], {
            error: "Valor de status inválido, use: 'REGISTERED' ou 'CANCELLED'",
        })
        .default(RegistrationStatus.REGISTERED),
})

export const updateRegistrationSchema = createRegistrationSchema.partial().transform((obj) => {
    // Remove propriedades undefined automaticamente
    return Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined))
})

export type CreateRegistrationDto = z.infer<typeof createRegistrationSchema>
export type UpdateRegistrationDto = {
    [K in keyof CreateRegistrationDto]?: CreateRegistrationDto[K]
}
