import type { RequestHandler } from "express"
import type { CrudService } from "../services/serviceFactory.js"

const parseId = (raw: string | undefined): number | null => {
    const id = Number(raw)
    return isNaN(id) || raw === undefined || raw === "" || id <= 0 ? null : id
}

export const createController = <TModel, TCreateInput, TUpdateInput>(
    service: CrudService<TModel, TCreateInput, TUpdateInput>
) => ({
    getAll: (async (req, res, next) => {
        try {
            return res.status(200).json(await service.getAll())
        } catch (error) { next(error) }
    }) as RequestHandler,

    getById: (async (req, res, next) => {
        try {
            const id = parseId(req.params.id as string)
            if (id === null) return res.status(400).json({ message: "ID inválido" })
            const data = await service.getById(id)
            if (!data) return res.status(404).json({ message: "Não encontrado" })
            return res.status(200).json(data)
        } catch (error) { next(error) }
    }) as RequestHandler,

    create: (async (req, res, next) => {
        try {
            return res.status(201).json(await service.create(req.body as TCreateInput))
        } catch (error) { next(error) }
    }) as RequestHandler,

    update: (async (req, res, next) => {
        try {
            const id = parseId(req.params.id as string)
            if (id === null) return res.status(400).json({ message: "ID inválido" })
            return res.status(200).json(await service.update(id, req.body as TUpdateInput))
        } catch (error) { next(error) }
    }) as RequestHandler,

    remove: (async (req, res, next) => {
        try {
            const id = parseId(req.params.id as string)
            if (id === null) return res.status(400).json({ message: "ID inválido" })
            await service.remove(id)
            return res.status(200).json({ message: "Deletado com sucesso" })
        } catch (error) { next(error) }
    }) as RequestHandler,
})