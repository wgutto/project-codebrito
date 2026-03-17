import z from "zod"

export const createUserSchema = z.object({
    name: z
        .string({ error: "Campo nome é obrigatório" })
        .min(2, { error: "Nome tem que ter no mínimo 2 caracters" })
        .max(50, { error: "Nome tem que ter no máximo 50 caracters" }),
    email: z
        .email({ error: "Email inválido" })
        .max(254, { error: "Email muito longo" }),
    cpf: z
        .string({ error: "Campo CPF é obrigatório" })
        .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, { error: "CPF inválido" }),
    role: z
        .enum(["TEACHER", "STUDENT"], { error: "Cargo inválido" })
        .default("STUDENT"),
})

export const updateUserSchema = createUserSchema.partial()

export type CreateUserDto = z.infer<typeof createUserSchema>
export type UpdateUserDto = { [K in keyof CreateUserDto]?: CreateUserDto[K] }
