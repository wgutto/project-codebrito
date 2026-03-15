import z from "zod";

export const createRegistrationSchema = z.object({
    studentId: z.number({ error: "É obrigatório identificar um estudante para matricular" }),
    courseId: z.number({ error: "É obrigatório identificar um curso para matricular" })
})

export const updateRegistrationSchema = createRegistrationSchema.partial()

export type CreateRegistrationDto = z.infer<typeof createRegistrationSchema>
export type UpdateRegistrationDto = { [K in keyof CreateRegistrationDto]?: CreateRegistrationDto[K] }