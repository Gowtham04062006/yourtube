import express from "express";
import {
    login,
    verifyOTP,
    resendOTP,
    updateprofile,
    updateTheme,
} from "../controllers/auth.js";

const routes = express.Router();

routes.post("/login", login);
routes.post("/verify-otp", verifyOTP);
routes.patch("/update/:id", updateprofile);
routes.patch("/theme/:id", updateTheme);
routes.post("/resend-otp", resendOTP);

export default routes;