import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from "swiper"
import {Navigation} from "swiper/modules"
import "swiper/css/bundle"


export default function Listing() {

    SwiperCore.use([Navigation])


const [listings,setlistings]=useState()
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
},[])


  return (
    <main>
    {listings && <div>
        <Swiper navigation>
      {
listings.imageUrl.map(url=>(<SwiperSlide key={url}>

    <div className='h-[500px]' style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}></div>

</SwiperSlide>))

      }

        </Swiper>
        
        </div>}

    </main>
  )
}
