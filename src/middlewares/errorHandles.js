// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, req, res, next) => {
    const status = error.status || 500
    const message = error.message || "Internal Server Error"

    return res.status(status).json({
        success: false,
        error: { message, status },
    })
}
