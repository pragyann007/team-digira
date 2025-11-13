import mongoose from "mongoose";

const rescuerSchema = new mongoose.Schema({
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
        default:"rescuer"
    },
   
    location:{
      long:{
        type:String
      },
      lat:{
        type:String
      }
    },
    verified:{
        type:Boolean,
        required:true,
        default:false
    },
   
})

export const Rescuer = mongoose.model("Rescuer",rescuerSchema)