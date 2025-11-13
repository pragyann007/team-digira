import { Router } from "express";
import { Auth } from "../controllers/auth.controllers.js";
import { isAuth} from "../middlewares/isAuth.js";
import { upload } from "../config/multer.js";
export const authRouter = Router();


const auth = new Auth();
authRouter.post("/register",auth.register)
authRouter.post("/otp",auth.checkOtp)
authRouter.post("/login",auth.login)

authRouter.post("/register-rescuer",auth.rescuerRegister);
authRouter.post("/login-rescuer",auth.rescuerLogin);






authRouter.get("/",isAuth,(req,res)=>res.send("hello world "))