import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config()

export const ConnectDb = async() => {
    try{
        const conn = await  mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    }catch(e){
         console('error :' , error )
         process.exit(1);
    }
}