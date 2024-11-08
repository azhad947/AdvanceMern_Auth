import dotenv from "dotenv";
import jwt from "jsonwebtoken";


dotenv.config()

export const generateWebToken = (res , userId) => {
   const token = jwt.sign({userId} , process.env.JWT_KEY , {
    expiresIn : "7d",
   })

  res.cookie("token" , token ,{
    httpOnly: true ,
    secure : process.env.NODE_ENV === "production" ,
    sameSite : "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })




   return token;
}






export const VerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString()
}