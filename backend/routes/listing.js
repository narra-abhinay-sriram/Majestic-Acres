import express from "express";
import { Listing } from "../api/db.js";
import Middleware from "./middleware.js";
const router =express.Router()

router.post("/create",Middleware,async(req,res)=>{


    try{
       const listing= await Listing.create(req.body)
        return res.status(200).json({listing,success:"true"})
    }catch(e){
        return res.status(403).json({message:"error while creating listing",success:"false"})
    }

})

router.get("/show/:id",Middleware,async(req,res)=>{

    if(req.user!=req.params.id)
    {
        return res.status(403).json({message:"not authorized",success:false})
    }
    try{

    const listing=await Listing.find({userRef:req.params.id})
    return res.status(200).json({listing,success:true})

    }catch(e){

        return res.status(403).json({message:"error while sending listing",success:false})
    }

})

export default router