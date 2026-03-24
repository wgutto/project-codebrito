import z from "zod"

const dateRegex = /^\d{4}-\d{2}-\d{2}$/

const removeUndefined = <T extends object>(obj: T) => Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined)) as T

const baseCourseSchema = z.object({
    title: z
        .string({ error: "Título obrigatório" })
        .min(2, { error: "Título tem que ter no mínimo 2 caracteres" })
        .max(50, { error: "Título tem que ter no máximo 50 caracteres" }),
    description: z
        .string({ error: "Descrição obrigatória" })
        .min(2, { error: "Descrição tem que ter no mínimo 2 caracteres" })
        .max(500, { error: "Descrição tem que ter no máximo 500 caracteres" }),
    categoryId: z.number({
        error: "É obrigatório identificar a categoria do curso",
    }),
    teacherId: z.number({
        error: "É obrigatório identificar o professor do curso",
    }),
    initialDate: z
        .string({ error: "Data inicial deve ser uma string" })
        .regex(dateRegex, {
            error: "Data inicial deve estar no formato YYYY-MM-DD",
        })
        .optional(),
})

export const createCourseSchema = baseCourseSchema.transform(removeUndefined)
export const updateCourseSchema = baseCourseSchema.partial().transform(removeUndefined)

export type CreateCourseDto = z.infer<typeof createCourseSchema>
export type UpdateCourseDto = {
    [K in keyof CreateCourseDto]?: CreateCourseDto[K]
}
