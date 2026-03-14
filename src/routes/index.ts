import express from "express"
import userRoutes from "./userRoutes.js"
import courseRoutes from "./courseRoutes.js"
import categoryRoutes from "./categoryRoutes.js"
import registrationRoutes from "./registrationRoutes.js"

const routes = express.Router()

routes.use(userRoutes)
routes.use(courseRoutes)
routes.use(registrationRoutes)
routes.use(categoryRoutes)

export default routes
