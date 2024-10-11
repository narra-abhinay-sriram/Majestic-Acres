import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from 'path';
const __dirname = path.resolve();

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
app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})