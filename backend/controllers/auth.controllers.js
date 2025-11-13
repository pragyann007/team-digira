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

 checkOtp = async (req, res) => {
    try {
      let { email, otp } = req.body;
  
      
      otp = parseInt(otp);
  
      if (!email || !otp) {
        return res.status(400).json({ message: "Email and OTP are required." });
      }
  
     
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
  
      console.log("Entered OTP:", otp, typeof otp);
      console.log("User OTP:", user.otp, typeof user.otp);
  
     
      if (Number(otp) !== Number(user.otp)) {
        
        return res.status(400).json({
          message: "Incorrect OTP. Please try again or request a new one.",
        });
      }
  
    
  
      return res.status(200).json({
        message: "OTP verified successfully. User registered successfully.",
      });
  
    } catch (err) {
      console.error("Error verifying OTP:", err);
      return res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  



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
        role:getUser.role,
        id:getUser._id
    }
    const token = jwt.sign(payload,key,{
        expiresIn:"7d"
    })

    res.cookie("token",token);

    return res.status(200).json({message:"Login sucessfull ..",user:payload})


}

rescuerRegister = async (req, res) => {
    const { name, email, phone, password, lang, lat } = req.body;
  
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    if (!lat || !lang) {
      return res.status(400).json({ message: "Location is required" });
    }
  
    try {
      const hashpass = await bcrypt.hash(password, 12);
  
      const rescuer = await Rescuer.create({
        name,
        email,
        phone,
        password: hashpass,
        role: "rescuer",
        location: { lang, lat },
        verified: false
      });
  
      return res.status(201).json({
        message: "You are registered but not verified. Admin will validate your profile and notify you soon via email."
      });
    } catch (err) {
      console.error("Rescuer registration error:", err);
      return res.status(500).json({ message: "Server error. Try again later." });
    }
  };
  

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

    return res.status(200).json({message:"Login sucessfull ..",payload})


}

}