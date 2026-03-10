import {Users} from "../models/userModel.js"
import {asyncWrapper} from "../errorHandlers/asyncWrapper.js"
import ApiError from "../errorHandlers/ApiError.js"
import crypto from "crypto"


export const ForgotPassword = asyncWrapper( async (req, res, next) =>{
    const {email} = req.body
    const user = await Users.fineOnde({email})
    if(!user){
        return next (new ApiError ("invalid email", 401))
    }

    const resetToken = user.creatPasswordResetToken()
    await user.save({ validateBeforeSave: false})

//url to be sent to user
    const resetURL = `${req.protocol}://${req.get("host")}/api/v1/auth/reset-password/${resetToken}`
    
    res.status(200)
    .json({
        success: true,
        message: "Password reset token generated"
    })

})

export const ResetPassword = asyncWrapper( async (req, res, next)=>{
    const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex")

    const user = await Users.findOnde({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()}
    })

    if(!user){
        return next ( new ApiError("Token invalid or expired", 401))
    }

    user.password = req.body.password
    user.passwordResetToken = undefined
    user.passwordResetExpires = undefined

    await user.save()

    res.status(200)
    .json({
        success: true,
        message: "password reset successfully"
    })
})



