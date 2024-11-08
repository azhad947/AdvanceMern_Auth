import express from "express";
import dotenv from "dotenv";
import { ConnectDb } from "./db/connectDb.js";
import authRouter from './route/authRoute.js'
import cookieParser from "cookie-parser";
import cors from 'cors'
import path from 'path'

dotenv.config();
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());
app.use(cookieParser())
const __dirname = path.resolve()

const PORT = 8080
app.use('/api/auth' , authRouter)
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.listen(PORT, async() => {
    await ConnectDb()
    console.log('Server is running on port8080');
});  