import express from "express";
import { Listing } from "../db.js";
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
    return res.status(403).json({message:"listing not found",success:"false"})

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
    //console.log(req.params.id)

    const listing=await Listing.findById(req.params.id)
    //console.log(listing)
    if(!listing)
        return res.status(403).json({message:"listing not found",success:"false"})

    if(req.user!=listing.userRef)
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


router.get('/get/:id',async(req,res)=>{

try{

    

const listing=await Listing.findOne({_id:req.params.id})
return res.status(200).json(listing)

}
catch(e){
    console.log(e)
    return res.status(403).json({message:"error while getting listing",success:"false"})
}

})

router.get('/get/', async (req, res) => {
    //console.log(req.query);
    try {
        const limit = parseInt(req.query.limit) || 9;
        const startindex = parseInt(req.query.startindex) || 0;

        let offer = req.query.offer === 'true' ? true  : { $in: [true, false] };
        let parking = req.query.parking === 'true' ? true : req.query.parking === 'false' ? false : { $in: [true, false] };
        let furnished = req.query.furnished === 'true' ? true : req.query.furnished === 'false' ? false : { $in: [true, false] };

        let type = req.query.type;
        if (type === undefined || type === 'all') {
            type = { $in: ['rent', 'sale'] };
        }

        const searchterm = req.query.searchterm || '';
        const sort = req.query.sort || 'createdAt';
        const order = req.query.order === 'asc' ? 1 : -1;

        const listings = await Listing.find({
            name: { $regex: searchterm, $options: 'i' },
            offer,
            parking,
            furnished,
            type,
        }).sort({ [sort]: order }).limit(limit).skip(startindex);
        
        return res.json(listings);
    } catch (e) {
        console.error(e);
        return res.json({ message: 'Error while searching', success: false });
    }
});
export default router