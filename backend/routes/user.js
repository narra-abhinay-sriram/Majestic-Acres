import express from "express";
import {User} from "../api/db.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
const router=express.Router()

router.post("/signup",async(req,res)=>{
    const {username,email,password}=req.body
    if (!username || !email || !password) {
        return res.status(400).json({
          success: "false",
          message: "Please provide all required fields",
        });
      }
    const hashpass=bcryptjs.hashSync(password,10)

    try{
        await User.create({username,email,password:hashpass})
        return res.json({message:"user created successfully",success:"true"})
    } catch(e){

        console.log(e)
        return res.status(403).json({
            success:"false",
            message:"user already exists"
        })
    }

    
    
})


router.post("/signin",async(req,res)=>{

const {password,email}=req.body


    const validuser= await User.findOne({email})
if(!validuser)
    return res.json({message:"user doesnt exist",success:"false"})

const validpass=bcryptjs.compareSync(password,validuser.password)
if(!validpass){
    return res.json({message:"wrong credentials",success:"false"})
}
 
try{const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET)

 const {password:pass,...rest}=validuser._doc

 return res.cookie("access_token",token,{httpOnly:true}).status(200).json({rest,success:"true"})}
 catch(e){
    return res.json({message:"something went wrong",success:"false"})
    
 }


})



export default router