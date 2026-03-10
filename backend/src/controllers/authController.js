import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import {Users} from "../models/userModel.js"
import {asyncWrapper} from "../errorHandlers/asyncWrapper.js"
import ApiError from "../errorHandlers/ApiError.js"
import {signAccessToken, signRefresheToken} from "../util/token.js"

export const RegisterUser = asyncWrapper( async (req, res, next ) =>{
    const {firstName, lastName, email, password} = req.body
    if(!firstName, !lastName, !email, !password){
        return next(new ApiError ("please fill the required filed", 404))
    }
   const UserExist = await Users.findOne({email})
   if(UserExist){
    return next( new ApiError ("email already in use", 404))
   }

   const user = await Users.create({
    firstName,
    lastName,
    email,
    password
   })

  res.status(200)
  .json({
    sucessful: true,
    message: "user created successfully",
    user
  })
})

export const LoginUser = asyncWrapper( async (req, res, next ) =>{
const {email, password} = req.body

const user = await Users.findOne({email}).select("+password")
if(!user || !(await bcrypt.compare(password, user.password))){
    return next( new ApiError (" Invalid email or password", 404))
}

const accessToken = signAccessToken({
    id:user._id
})

const refreshToken = signRefresheToken({
    id:user._id
})

res.status(200)
.json({
    success: true,
    message: `Welcome ${user.firstName}`,
    user:{
      id: user._id,
      FirstName: user.firstName,
      LastName: user.lastName,
      email: user.email
    },
    accessToken,
    refreshToken
})
})

export const RefreshAcessToken = (req, res, next) =>{
    const{refreshToken} = req.body
    if(!refreshToken){
        return next( new ApiError ("refresh token required", 401))
    }

    jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET,
        (err, decoded)=>{
            if(err) return next(new ApiError( "Invalid refresh token", 401))
          const accessToken = signAccessToken({
        id: decoded.id})

           res.status(200)
           .json({
            success: true,
            accessToken
           })
        }
    )
}


export const LogoutUser = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
