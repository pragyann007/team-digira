import { Router } from "express";
import { Auth } from "../controllers/auth.controllers.js";
import { isAuth} from "../middlewares/isAuth.js";
export const authRouter = Router();


const auth = new Auth();
authRouter.post("/register",auth.register)
authRouter.post("/otp",auth.checkOtp)
authRouter.post("/login",auth.login)

authRouter.get("/",isAuth,(req,res)=>res.send("hello world "))