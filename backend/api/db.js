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
    avatar:{
        type:String,
        default:"https://imgs.search.brave.com/pZ2DKWjtw7hzsB-caM9l5n5xAr6aaH4tXxJAIMSHK5s/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA0Lzk4LzcyLzQz/LzM2MF9GXzQ5ODcy/NDMyM19Gb25BeThM/WVlmRDFCVUMwYmNL/NTZhb1l3dUxISjJH/ZS5qcGc"
    },
    
    
},{timestamps:true},)


const listingschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    regularPrice:{
        type:Number,
        required:true
    },
    discountedPrice:{
        type:Number,
        required:true
    },
    bathrooms:{
        type:Number,
        required:true
    },
    bedrooms:{
        type:Number,
        required:true
    },
    
    furnished:{
        type:Boolean,
        required:true
    },
    parking:{
        type:Boolean,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    offer:{
        type:Boolean,
        required:true
    },
    imageUrls:{
        type:Array,
        required:true
    },
    userRef:{
        type:String,
        required:true
    },
},{timestamps:true})

export const Listing=mongoose.model('Listing',listingschema)

export  const User=mongoose.model('User',userschaema)