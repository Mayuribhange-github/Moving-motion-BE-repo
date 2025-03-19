import express from "express";
import { signIn, signUp, updateUser } from "../controllers/user.controller.js";
import multer from 'multer'
import { auth } from "../middleware/authorization.js";

const upload = multer({ dest: "public/images" })
const router = express.Router();
router.post("/sign-up", signUp);
router.post("/update",auth, upload.single("profileImage"), updateUser);
router.post("/sign-in", signIn);
// router.post("/payment", payment);
export default router;