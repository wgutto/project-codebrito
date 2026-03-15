import type { RequestHandler } from "express"
import type { CrudService } from "../services/serviceFactory.js"
import z from "zod"

const idSchema = z.coerce.number({ error: "ID inválido" }).int({ error: "ID inválido" }).positive({ error: "ID inválido" })

export const createController = <TModel, TCreateInput, TUpdateInput>(
    service: CrudService<TModel, TCreateInput, TUpdateInput>,
    createSchema: z.ZodType<TCreateInput>,
    updateSchema: z.ZodType<TUpdateInput>
) => ({
    getAll: (async (req, res, next) => {
        try {
            return res.status(200).json(await service.getAll())
        } catch (error) { next(error) }
    }) as RequestHandler,

    getById: (async (req, res, next) => {
        try {
            const idParsed = idSchema.safeParse(req.params.id)
            if(!idParsed.success) return res.status(400).json({ message: idParsed.error.issues })

            const data = await service.getById(idParsed.data)
            if (!data) return res.status(404).json({ message: "Não encontrado" })

            return res.status(200).json(data)
        } catch (error) { next(error) }
    }) as RequestHandler,

    create: (async (req, res, next) => {
        try {
            const bodyParsed = createSchema.safeParse(req.body)

            if(!bodyParsed.success) return res.status(400).json({ message: bodyParsed.error.issues })

            return res.status(201).json(await service.create(bodyParsed.data))
        } catch (error) { next(error) }
    }) as RequestHandler,

    update: (async (req, res, next) => {
        try {
            const idParsed = idSchema.safeParse(req.params.id)
            if(!idParsed.success) return res.status(400).json({ message: idParsed.error.issues })

            const bodyParsed = updateSchema.safeParse(req.body)
            if(!bodyParsed.success) return res.status(400).json({ message: bodyParsed.error.issues })

            return res.status(200).json(await service.update(idParsed.data, bodyParsed.data))
        } catch (error) { next(error) }
    }) as RequestHandler,

    remove: (async (req, res, next) => {
        try {
            const idParsed = idSchema.safeParse(req.params.id)
            if(!idParsed.success) return res.status(400).json({ message: idParsed.error.issues })
            

            await service.remove(idParsed.data)
            return res.status(200).json({ message: "Deletado com sucesso" })
        } catch (error) { next(error) }
    }) as RequestHandler,
})