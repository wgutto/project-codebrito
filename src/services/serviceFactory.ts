export type CrudService<TModel, TCreateInput, TUpdateInput> = {
    getAll(): Promise<TModel[]>
    getById(id: number): Promise<TModel>
    create(data: TCreateInput): Promise<TModel>
    update(id: number, data: TUpdateInput): Promise<TModel>
    remove(id: number): Promise<TModel>
}

type CrudDelegate<TModel, TCreateInput, TUpdateInput> = {
    findMany(): Promise<TModel[]>
    findUnique(args: { where: { id: number } }): Promise<TModel>
    create(args: { data: TCreateInput }): Promise<TModel>
    update(args: { where: { id: number }; data: TUpdateInput }): Promise<TModel>
    delete(args: { where: { id: number } }): Promise<TModel>
}

export const createService = <TModel, TCreateInput, TUpdateInput>(
    delegate: CrudDelegate<TModel, TCreateInput, TUpdateInput>,
): CrudService<TModel, TCreateInput, TUpdateInput> => ({
    getAll: () => delegate.findMany(),
    getById: (id) => delegate.findUnique({ where: { id } }),
    create: (data) => delegate.create({ data }),
    update: (id, data) => delegate.update({ where: { id }, data }),
    remove: (id) => delegate.delete({ where: { id } }),
})
