import z from "zod";

export const createCategorySchema = z.object({
    title: z.string({ error: "Título obrigatório"}).min(2, { error: "Título tem que ter no mínimo 2 caracteres" }).max(50, { error: "Título tem que ter no máximo 50 caracteres" })
})

export const updateCategorySchema = createCategorySchema.partial()

export type CreateCategoryDto = z.infer<typeof createCategorySchema>
export type UpdateCategoryDto = { [K in keyof CreateCategoryDto]?: CreateCategoryDto[K] }