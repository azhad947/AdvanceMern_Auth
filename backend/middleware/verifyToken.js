import jwt from "jsonwebtoken"

import dotenv from "dotenv";



dotenv.config()

export const VerifyToken = (req , res , next) => {
    const token = req.cookies.token;
    
    if(!token){
        return res.status(403).json({ success: false, message: "No token found" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);

		if (!decoded) return res.status(401).json({ success: false, message: "Unauthorized - invalid token" });

		req.userId = decoded.userId;
		next();
        
    } catch (error) {
        console.log("Error in verifyToken ", error);
		return res.status(500).json({ success: false, message: "Server error" });
    } 
}