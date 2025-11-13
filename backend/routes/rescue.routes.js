import express from "express";
import { upload } from "../config/multer.js";
import { acceptRescueRequest, createRescueRequest } from "../controllers/rescue.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/create", isAuth ,upload.single("image"),createRescueRequest);
router.put("/accept", isAuth, acceptRescueRequest);
router.get("/all-requests-user/:userid",isAuth,)


export const rescueRouter = router;
