import express from "express"
import {
    ResetPassword,
    ForgotPassword
} from "../controllers/resetPasswordController.js"


const router = express.Router()

router.patch("/resetPassword/:token", ResetPassword)
router.post("/forgotPassword", ForgotPassword)

export default router

