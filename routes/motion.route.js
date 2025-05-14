import express from "express";
import { auth } from "../middleware/authorization.js";
import { navigationMotion } from "../controllers/motion.controller.js";

const router = express.Router();
router.get("/navigation", navigationMotion);
export default router;
