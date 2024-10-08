import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app=express()
//app.use(cors())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
  }));
  
app.use(cookieParser())
app.use(express.json())

import mainRouter from "../routes/index.js"

app.use("/api/v1",mainRouter)

app.listen(3000,()=>{console.log("app running at 3000  ")})