import mongoose from "mongoose";

const rescueReportSchema = new mongoose.Schema({

    reporter:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User"
    },
    rescuerId:{
         type:mongoose.Schema.Types.ObjectId ,
         ref:"Rescuer"
        
    },
    animalType:{
        type:String,
        required:true
    },
    severity:{
        type:String,
        required:true

    },
    urgencyState:{
        type:String,
        required:true,
        enum:["Minor","Major","Serious"]
    },
    location:{
        long:{
            type:String
          },
          lat:{
            type:String
          }
    },
    image:{
        type:String
    },
    status:{
        type:String,
        required:true,
        enum:["Active","Pending","Completed","Failed"],
    }

},{timestamps:true})

export const  Report = mongoose.model("Report",rescueReportSchema);
