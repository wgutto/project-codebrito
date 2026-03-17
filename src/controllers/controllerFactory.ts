import type { RequestHandler } from "express"
import type { CrudService } from "../services/serviceFactory.js"
import z from "zod"

export const idSchema = z.coerce
    .number({ error: "ID inválido" })
    .int({ error: "ID inválido" })
    .positive({ error: "ID inválido" })

export const createController = <TModel, TCreateInput, TUpdateInput>(
    service: CrudService<TModel, TCreateInput, TUpdateInput>,
    createSchema: z.ZodType<TCreateInput>,
    updateSchema: z.ZodType<TUpdateInput>,
) => ({
    getAll: (async (req, res, next) => {
        try {
            const data = await service.getAll()

            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }) as RequestHandler,

    getById: (async (req, res, next) => {
        try {
            const idParsed = idSchema.parse(req.params.id)

            const data = await service.getById(idParsed)

            return res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }) as RequestHandler,

    create: (async (req, res, next) => {
        try {
            const bodyParsed = createSchema.parse(req.body)

            const created = await service.create(bodyParsed)

            return res.status(201).json(created)
        } catch (error) {
            next(error)
        }
    }) as RequestHandler,

    update: (async (req, res, next) => {
        try {
            const idParsed = idSchema.parse(req.params.id)

            const bodyParsed = updateSchema.parse(req.body)
            const updated = await service.update(idParsed, bodyParsed)

            return res.status(200).json(updated)
        } catch (error) {
            next(error)
        }
    }) as RequestHandler,

    remove: (async (req, res, next) => {
        try {
            const idParsed = idSchema.parse(req.params.id)

            await service.remove(idParsed)

            return res.status(200).json({ message: "Deletado com sucesso" })
        } catch (error) {
            next(error)
        }
    }) as RequestHandler,
})
