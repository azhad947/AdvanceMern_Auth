import express from "express";

import { Login ,Logout, Signup, Verify , ForgotPassword , ResetPassword, checkAuth} from "../controllers/auth.js";
import { VerifyToken } from "../middleware/verifyToken.js";


const router = express.Router();

router.get("/check-auth", VerifyToken, checkAuth);
router.post("/signup", Signup);

router.post("/login", Login);

router.post("/logout", Logout);

router.post('/verify'  , Verify);

router.post('/forgotpassword' , ForgotPassword);


router.post('/reset-password/:token' , ResetPassword);







export default router;
