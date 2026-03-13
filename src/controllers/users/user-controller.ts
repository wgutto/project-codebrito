import type { RequestHandler } from "express";
import { getAllUsers } from "../../services/users/get-all-users.js";
import { getUserService } from "../../services/users/get-user.js";
import { createUserService } from "../../services/users/create-user.js";
import { deleteUserService } from "../../services/users/delete-user.js";
import { updateUserService } from "../../services/users/update-user.js";

export const getAllUsersController: RequestHandler = async (req, res, next) => {
    try {
        const allUsers = await getAllUsers()

        return res.status(200).json(allUsers)
    } catch (error) {
        console.error("Erro ao pegar todos os users: ", error)
    }
}

export const getUserController: RequestHandler = async (req, res, next) => {
    const id = req.params.id

    try {
        const userFound = await getUserService(Number(id))

        if(!userFound) return res.status(404).send({
            message: "Usuário não foi encontrado"
        })

        return res.status(200).json(userFound)
    } catch (error) {
        console.error("Erro ao buscar um user: ", error)
    }
}

export const createUserController: RequestHandler = async (req, res, next) => {
    const userData = req.body

    try {
        const userCreated = await createUserService(userData)

        if(!userCreated) return res.status(400).send({
            message: "Usuário não foi criado"
        })

        return res.status(201).json({
            message: "Usuário criado com sucesso",
            user: userCreated
        })
    } catch (error) {
        console.error("Erro ao criar usuário:", error)
    }
}

export const updateUserController: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    const dataToUpdate = req.body

    try {
        const userUpdated = await updateUserService(Number(id), dataToUpdate)

        if(!userUpdated) return res.status(400).send({
            message: "Erro ao atualizar usuário"
        })

        return res.status(200).send({
            message: "Usuário atualizado com sucesso"
        })
    } catch (error) {
        console.error("Erro ao atualizar o usuário:", error)
    }
}

export const deleteUserController: RequestHandler = async (req, res, next) => {
    const id = req.params.id

    try {
        const isDeleted = await deleteUserService(Number(id))

        if(!isDeleted) return res.status(400).send({
            message: "Erro ao deletar usuário"
        })

        return res.status(200).send({
            message: "Usuário deletado com sucesso"
        })
    } catch (error) {
        console.error("Erro ao deletar usuário: ", error)
    }
}