import express from "express";
import { register } from "../controllers/register.controllers.js";
import { login } from "../controllers/login.controllers.js";
import { resetPass } from "../controllers/resetPass.controllers.js";
import { forgotPass } from "../controllers/forgotPass.controllers.js";
import { loginRateLimiter, registerRateLimiter, forgotPassRateLimiter, resetPassRateLimiter } from "../middlewares/rateLimiter.middlewares.js";

const router = express.Router();

//register
router.post("/register", register);
// router.post("/register", registerRateLimiter, register);
//login
router.post("/login", login);
// router.post("/login", loginRateLimiter, login);
//forgotPassword
router.post("/forgotPass", forgotPass);
// router.post("/forgotPass", forgotPassRateLimiter, forgotPass);
//resetPassword
router.post("/resetPass", resetPassRateLimiter, resetPass);

export default router;
