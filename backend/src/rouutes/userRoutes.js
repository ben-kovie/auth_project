import express from "express"
import {
    RegisterUser,
    LoginUser,
    RefreshAcessToken,
    LogoutUser
} from "../controllers/authController.js"
import {auth} from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/login", LoginUser)
router.post("/register", RegisterUser)
router.post("/refresh", RefreshAcessToken)
router.post("/logout", LogoutUser)

//authenticate the token of every login and registered users
router.use(auth)

export default router