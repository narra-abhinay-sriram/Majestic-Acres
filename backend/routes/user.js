import express from "express";
import {User} from "../api/db.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import Middleware from "./middleware.js"
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
        if(!validpass)
            {
          return res.json({message:"wrong credentials",success:"false"})
          }
 
              try{const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET)

                          const {password:pass,...rest}=validuser._doc

              return res.cookie("access_token",token,{httpOnly:true}).status(200).json({rest,success:"true"})}
         catch(e)
         {
                      return res.json({message:"something went wrong",success:"false"})
    
           }
})


router.post("/google",async(req,res)=>{
    console.log(req.body)

    const {username,email,photo}=req.body

try{

    const validuser=await User.findOne({email:email})
    if(validuser)
    {
        const token=jwt.sign({id:validuser._id},process.env.JWT_SECRET)
    const {password:pass,...rest}=validuser._doc

    res.cookie("access_token",token,{httpOnly:true}).status(200).json({rest})
    }else{

        const password = Math.random().toString(36).slice(-8); 

         const hashedpassword=bcryptjs.hashSync(password,10)
         const user=await User.create({username:username.split(" ").join(""),email:email,password:hashedpassword,avatar:photo})
         const token=jwt.sign({id:user._id},process.env.JWT_SECRET)
         const {password:pass,...rest}=user._doc
     
         res.cookie("access_token",token,{httpOnly:true}).status(200).json({rest})

    }


}
catch(e){
    console.log(e)
    res.json({message:"something went wrong",success:"false"})
}

})


router.post("/update/:id",Middleware,async(req,res)=>{
//    console.log(req.params.id)
//    console.log(req.user)

if(req.user!=req.params.id)
    return res.status(403).json({message:"incorrect ID",success:false})
//console.log("hii")

try{

    const hashedpassword=bcryptjs.hashSync(req.body.password,10)
   // console.log(hashedpassword)

const updateduser=await User.findByIdAndUpdate(req.user,
    {
        $set:{ 
            username:req.body.username,
            email:req.body.email,
            password:hashedpassword,
            avatar:req.body.avatar

}},{new:true})
//console.log(updateduser)

const {password:pass, ...rest}=updateduser._doc

return res.status(200).json({rest,success:"true"})


}catch(e){
    console.log(e)
    return res.status(403).json({
        message:"error while updating || update your password",
        success:"false"
    })
}


})




export default router