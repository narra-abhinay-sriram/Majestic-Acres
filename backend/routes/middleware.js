import express from "express";
import jwt from "jsonwebtoken"

const Middleware=async(req,res,next)=>{

   const token=req.headers.authorization
  //  console.log(token)
  if (! token) {
    return res.status(401).json({ message: "Authentication token is required", success: "false" });
}

    try{
        const user=jwt.verify(token,process.env.JWT_SECRET)
       // console.log(user.id)
        req.user=user.id
        next()
    }catch(e){
        console.log(e)
        return res.status(403).json({message:e ,success:"false",token:process.env.JWT_SECRET})
    }
}
export default Middleware