import express from "express"
import userRoutes from "./userRoutes.js"
import courseRoutes from "./course-routes.js"

const routes = express.Router()

routes.use(userRoutes)
routes.use(courseRoutes)

export default routes
