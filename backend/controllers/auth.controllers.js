import { Rescuer } from "../models/rescuer.model.js";
import { User } from "../models/user.model.js";
import { genOtp } from "../utils/otpGen.js";
import { sendOtpMail } from "../utils/sendEmail.js";
import bcrypt, { hash } from "bcryptjs"
import jwt from "jsonwebtoken"

export class Auth{
    register = async (req,res)=>{

        const {name,email,phone,password,role} = req.body ; 


        if(!name || !email || !phone || !password){
            return res.status(400).json({
                message:"All fields are required ... "
            })
        }
        const otp = await genOtp();

const hashpass = await  bcrypt.hash(password,12)
        const createUser = await User.create({
            name,email,phone,password:hashpass,role,otp
        })
        sendOtpMail(email,otp);

        return res.status(201).json({message:"Otp sent",otp})
}

checkOtp = async (req,res)=>{
    const {email,otp} = req.body ; 

    if(!otp){
        return res.status(400).json({message:"Otp is required "})
    }

    const user = await User.findOne({email});
    console.log(otp,typeof(otp))
    console.log(user.otp,typeof(user.otp))


    let count = 1; 

    if(Number(otp)!==user.otp){
        if(count<3){
            return res.status(400).json({message:`Incorrect Otp ${count} chance remaining   ...`})

            
        }
        return res.status(400).json({message:"Incorrect Otp pleaseregister again  ..."})

    }

    return res.status(200).json({message:"User registered sucessfully ..."})

}
login = async (req,res)=>{

    const {email,password} = req.body ; 
    if( !email || !password){
        return res.status(400).json({
            message:"All fields are required ... "
        })
    }

    const getUser = await User.findOne({email})

    if(!getUser){
        return res.status(400).json({message:"User not registered pleasedo register ."})
    }
    const checkPass = await bcrypt.compare(password,getUser.password);

    if(!checkPass){
        return res.status(400).json({
            message:"Invalid Password .."
        })
    }

    const key = process.env.JWT_SECRET ; 
    const payload = {
        name:getUser.name,
        email:getUser.email,
        password:getUser.password,
        role:getUser.role
    }
    const token = jwt.sign(payload,key,{
        expiresIn:"7d"
    })

    res.cookie("token",token);

    return res.status(200).json({message:"Login sucessfull .."})


}

rescuerRegister = async (req,res)=>{
    const {name,email,phone,password,location} = req.body ; 

    const pancarDocs = req.files.file ; 



    if(!name || !email || !phone || !password){
        return res.status(400).json({
            message:"All fields are required ... "
        })
    }

    if(!pancarDocs){
        return res.status(400).json({message:"Upload a file too ..."})
    }

    const hashpass = await bcrypt.hash(password,12);

    const rescuer = await Rescuer.create({
        name,email,phone,password:hashpass,role:"rescuer",location,documents,verified:false
    })

    return res.status(201).json({message:"You are registered but not verified you will be able to login when you wil be verified . Your profile will be shortly validate by admin and you will be notified very soon via email."})
}

rescuerLogin = async (req,res)=>{

    const {email,password} = req.body ; 
    if( !email || !password){
        return res.status(400).json({
            message:"All fields are required ... "
        })
    }

    const getRescuer = await Rescuer.findOne({email})

    if(!getRescuer){
        return res.status(400).json({message:"Rescuer not registered please do register ."})
    }

 if (!getRescuer.verified){
    return res.status(400).json({message:"This account is not verified please keep a patience you will only be able to login after the admin verifies."})
 }
    const checkPass = await bcrypt.compare(password,getRescuer.password);

    if(!checkPass){
        return res.status(400).json({
            message:"Invalid Password .."
        })
    }

    const key = process.env.JWT_SECRET ; 
    const payload = {
        name:getRescuer.name,
        email:getRescuer.email,
        password:getRescuer.password,
        role:getRescuer.role,
        verified:getRescuer.verified
    }
    const token = jwt.sign(payload,key,{
        expiresIn:"7d"
    })

    res.cookie(token,token);

    return res.status(200).json({message:"Login sucessfull .."})


}

}