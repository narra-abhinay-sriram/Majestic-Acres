import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(process.env.mongo).then(()=>{
    console.log("db is connected")
}).catch((e)=>{
    console.log(e)

})

const app=express()

app.listen(3000,()=>{console.log("app running at 3000  ")})