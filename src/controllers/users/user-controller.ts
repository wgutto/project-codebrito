import type { RequestHandler } from "express";
import { getAllUsers } from "../../services/users/get-all-users.js";

export const userController: RequestHandler = async (req, res, next) => {
    try {
        const allUsers = await getAllUsers()

        return res.status(200).json(allUsers)
    } catch (error) {
        console.error("Erro ao pegar todos os users: ", error)
    }
}