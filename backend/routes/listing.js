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

router.delete("/delete/:id",Middleware,async(req,res)=>{

const listing=await Listing.findById(req.params.id)
if(!listing)
    return req.status(403).json({message:"listing not found",success:"false"})

if(req.user!=listing.userRef)
    return req.status(403).json({message:"delete your own listings",success:"false"})
try {
await Listing.findByIdAndDelete(req.params.id)
return res.status(200).json({message:'listing has been deleted ',success:false})

}
catch(e){
    return res.status(403).json({message:'error while deleting ',success:false})
}

})

router.post("/update/:id",Middleware,async(req,res)=>{

    const listing=await Listing.findById(req.params.id)
    if(!listing)
        return res.status(403).json({message:"listing not found",success:"false"})

    if(req.user!=req.listing.userRef)
    {
        return res.status(403).json({message:"Edit your own listings",success:"false"})

    }
    try{

     const updatedlist=await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})

     return res.status(200).json(updatedlist)


    }catch(e){
        return res.status(403).json({message:"Error while editing the list",success:"false"})

    }
})

export default router