import express from "express"
import {notFound} from "../src/errorHandlers/notFound.js"
import userRoutes from "./rouutes/userRoutes.js"
import resetPasswordRoute from "./rouutes/ressetPasswordRoute.js"
import {globalErrorHandler} from "../src/errorHandlers/globalErrorhandler.js"
import cors from "./util/core.js"

const app = express()

// allow frontend use of api
app.use(cors)

// express middleWare 
app.use(express.json())

//Api routes
app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/auth", resetPasswordRoute)

// not found route
app.use(notFound)

//globalErrorHandler
app.use(globalErrorHandler)

export default app