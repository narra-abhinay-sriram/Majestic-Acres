import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(process.env.mongo).then(()=>{
    console.log("db is connected")
}).catch((e)=>{
    console.log(e)

})
const userschaema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    
})

export  const User=mongoose.model('User',userschaema)