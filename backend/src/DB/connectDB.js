import mongoose from "mongoose"

export const connnectDB = async ()=>{
    try{
     const db = process.env.MONGO_URL
     await mongoose.connect(db, {})
     console.log("DataBase connected succefully")
    }catch (err){
        console.log("failed to connect to dateBase")
        process.exit(1)
    }
}