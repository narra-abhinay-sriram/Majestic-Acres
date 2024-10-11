import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import "swiper/css/bundle"
import { FaBath, FaBed, FaChair, FaMailBulk, FaMapMarkedAlt, FaMapMarkerAlt, FaParking, FaPhone, FaPhoneAlt, FaPhoneSquareAlt, FaPhoneVolume, FaShare } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Contact from '../components/Contact'


export default function Listing() {

    SwiperCore.use([Navigation])

    
const {currentuser}=useSelector(store=> store.user)
const [listings,setlistings]=useState(null)
const [copied,setcopied]=useState(false)
const [contact,setcontact]=useState(false)
//if(!listings)
   // return
console.log(listings)
const params=useParams()

useEffect(()=>{

const fetchlist=async()=>{
    const resp=await fetch('http://localhost:3000/api/v1/listing/get/'+params.listing,{method:'GET',headers:{
    'Content-Type': 'application/json',
  },
  credentials: 'include'})

const data=await resp.json()
setlistings(data)
}
fetchlist()
},[params.listing])


  return (
    <main>
    {listings && <div>
        <Swiper navigation>
      {
listings.imageUrl.map(url=>(<SwiperSlide key={url}>

    <div className='h-[600px]' style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>

</SwiperSlide>))

      }</Swiper>
        </div>}

     <div className='fixed top-[13%] right-[3%] z-10 w-7 h-7 border rounded-md flex justify-center items-center bg-slate-100 cursor-pointer'>
     <FaShare
     className='text-slate-700 w-fit' 
     onClick={()=>{
        navigator.clipboard.writeText(window.location.href)
        setcopied(true)

        setTimeout(() => {
            setcopied(false)
            
        }, 1000);
     }}
     /></div>

     {copied && <p className='fixed top-[20%] right-[5%] z-10 rounded-md bg-slate-100 p-2 '>Link copied!!</p>}

     {listings && <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-5'>

        
            <p className='text-2xl font-bold'>
                {listings.name} - ₹ {' '}
                {listings.regularPrice.toLocaleString('en-US')}
                 {listings.type=='rent'&& ' /month'}

            </p>
            <p className='flex gap-2 items-center font-semibold text-slate-700'>
                <FaMapMarkerAlt  className='text-green-600' />
                {listings.address}
            </p>

            <div className='flex gap-8 items-center'>
                <p className='text-white font-semibold bg-red-700 p-1 rounded-md w-full max-w-[200px] text-center'>
                    {listings.type=='rent'? 'For Rent':'For Sale'}
                </p>
                <p className='text-white font-semibold bg-green-700 p-1 rounded-md w-full max-w-[200px] text-center'>
                    { listings.offer ? '₹'+'  '+listings.discountedPrice.toLocaleString('en-US') +' off':'No Offer' } 
                </p></div>
            <p className='text-slate-900'><b className='text-black font-semibold'>Description-</b> {listings.description}</p>
            <ul className='text-green-900 font-semibold text-sm  flex flex-wrap items-center gap-4 sm:gap-6'>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                 <FaBed className=' text-xl ' />
                 <p>{listings.bedrooms > 1
                  ? `${listings.bedrooms} beds `
                  : `${listings.bedrooms} bed `}</p>
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                 <FaBath className=' text-lg ' />
                 <p>{listings.bathrooms > 1
                  ? `${listings.bathrooms} baths`
                  : `${listings.bathrooms} bed `}</p>
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                 <FaParking className=' text-lg ' />
                 <p>{listings.parking ? 'parking' :'No Parking'}</p>
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap'>
                 <FaChair className=' text-lg ' />
                 <p>{listings.furnished ? 'furnished' :'Not furnished'}</p>
                </li>
                
            </ul>
           {currentuser && listings.userRef!=currentuser._id && !contact &&
           <div className='mx-auto w-[100%] mt-3'>
                <button onClick={()=>setcontact(true)} className='text-white bg-slate-700 p-3 text-center uppercase rounded-lg  w-[100%] '>Contact Landlord</button>
            </div>}

            {contact && <Contact listing={listings}/> }
            {
                !currentuser && <div className='flex  items-center mt-4'>
                    <FaPhoneSquareAlt className='text-slate-700 w-10 h-10 '/>
                    <Link to={'/signin'} className='text-xs md:text-sm  bg-slate-700 w-[45%] p-2 rounded-lg text-white uppercase hover:opacity-85 text-center'> Sign In to contact landlord </Link>
                </div>
            }
            
        </div>
     }


    </main>
  )
}
