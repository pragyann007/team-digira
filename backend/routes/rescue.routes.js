import express from "express";
import { upload } from "../config/multer.js";
import { createRescueRequest } from "../controllers/rescue.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/create", isAuth ,upload.single("image"),createRescueRequest);


export const rescueRouter = router;
