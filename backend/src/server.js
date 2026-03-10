import dotenv from "dotenv"
import app from "./app.js"
import {connnectDB} from "./DB/connectDB.js"

dotenv.config({path: "./src/util/.env"})

const port = process.env.PORT || 5000
 
const startServer = async()=>{
   try{
   await connnectDB()
   app.listen(port, ()=>{
    console.log(`app running on port ${port}`)
   })
   }catch(error){
      process.exit(1)
   }
}

startServer()
