import mongoose, { mongo } from "mongoose";
import dotenv from "dotenv"
dotenv.config()

const url = process.env.MONGO_URI

export const connectDb = async()=>{
    
    try {
        await mongoose.connect(url)
        console.log("Database connected ....")
        
    } catch (error) {

        console.log("error in db connection \n \n ",error)
        
    }

}