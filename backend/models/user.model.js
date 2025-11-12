import mongoose, { mongo } from "mongoose"

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:"user"
    },
    otp:{
        type:Number,
        required:true
    }
},{timestamps:true})

export const User = await mongoose.model("User",userSchema);
