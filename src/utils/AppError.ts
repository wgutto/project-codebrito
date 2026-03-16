export class AppError extends Error {
    isOperational = true

    constructor(
        public override message: string,
        public status: number
    ) {
        super(message)
    }
}