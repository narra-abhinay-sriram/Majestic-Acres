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

export default router