import type { ErrorRequestHandler } from "express"
import { ZodError } from "zod"

// eslint-disable-next-line no-unused-vars
export const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if(error instanceof ZodError) {
        const messageError = error.issues.map((item) => item.message)
        const message = messageError.join("; ")

        return res.status(400).json({
            success: false,
            status: 400,
            message: `Erros encontrados: ${message}`
        })
    }

    const status = error.status ?? 500
    const message = error.isOperational ? error.message : "Internal Server Error"

    return res.status(status).json({
        success: false,
        status: status,
        message: message
    })
}
