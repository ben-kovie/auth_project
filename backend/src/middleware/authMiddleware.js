import jwt from "jsonwebtoken"
import {Users} from "../models/userModel.js"
import ApiError from "../errorHandlers/ApiError.js"

export const auth = async (req, res, next )=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return next(new ApiError ("unauthorized", 400))
    }

    const token = authHeader.split(" ")[1]

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        const user = await Users.findById(decode.id)
        if(!user){
            return next(new ApiError ("invalid user", 400))
        }

        req.user= user
        next()
    }
    catch(erro){
     next(new ApiError ("invalid request", 404))
    }
   
}