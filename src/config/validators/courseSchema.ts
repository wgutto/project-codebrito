import z from "zod"

export const createCourseSchema = z.object({
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
})

export const updateCourseSchema = createCourseSchema.partial()

export type CreateCourseDto = z.infer<typeof createCourseSchema>
export type UpdateCourseDto = {
    [K in keyof CreateCourseDto]?: CreateCourseDto[K]
}
