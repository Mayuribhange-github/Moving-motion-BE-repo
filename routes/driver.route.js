import express from "express";
import { attachVehicle, getAttachedVehicle, signIn, signUp } from "../controllers/driver.controller.js";
import multer from "multer";
import { auth } from "../middleware/authorization.js";
const upload = multer({ dest: 'public/images' });
const router = express.Router();

router.post("/sign-up", signUp)
router.post("/sign-in", signIn)
router.get("/attach-vehicle", getAttachedVehicle)

router.post("/attach-vehicle", upload.array("Images", 6), attachVehicle)
export default router;