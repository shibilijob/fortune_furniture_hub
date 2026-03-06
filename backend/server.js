import dotenv from "dotenv"
dotenv.config()

import express from "express"
import connectDB from "./config/db.js"
import userRouts from "./routs/userRouts.js"
import adminRouts from "./routs/adminRouts.js"
import cookieParser from "cookie-parser"
import cors from "cors"

const app = express()

connectDB()

app.use(cors({
  origin: ["http://localhost:5173",
  "https://fortune-furniture-hub.vercel.app/"],
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())
app.use('/user',userRouts)
app.use('/admin',adminRouts)

const port= process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`server running in ${port}`);
})
