import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import swaggerUi from "swagger-ui-express"
import swaggerJson from "./swagger.json" with { type: "json" }
import { errorHandler } from "./middlewares/errorHandler.js"
import routes from "./routes/index.js"

const app = express()

app.use(helmet())
app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerJson))
app.use(express.urlencoded({ extended: true }))

// Rotas
app.use("/api/", routes)

app.use(errorHandler)

export default app
