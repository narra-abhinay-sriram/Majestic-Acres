import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {Swiper,SwiperSlide} from 'swiper/react'
import { Navigation } from "swiper/modules"
import SwiperCore from "swiper"
import 'swiper/css/bundle'
import List from "../components/List"

const Home = () => {

  const [offerlistings,setofferlistings]=useState([])
  const [salelistings,setsalelistings]=useState([])
  const [rentlistings,setrentlistings]=useState([])
  SwiperCore.use(Navigation)
  console.log(offerlistings)
 

  useEffect(()=>{
  const offerfetch=async()=>{

    const resp =await fetch(`http://localhost:3000/api/v1/listing/get?offer=true&limit=3`,{method:'GET',headers:{'Content-Type': 'application/json' }, credentials: 'include' })
    const data=await resp.json()
    setofferlistings(data)
    salefetch()
  }
  const salefetch=async()=>{

    const resp =await fetch(`http://localhost:3000/api/v1/listing/get?type=sale&limit=3`,{method:'GET',headers:{'Content-Type': 'application/json' }, credentials: 'include' })
    const data=await resp.json()
    setsalelistings(data)
   rentfetch()
  }
  const rentfetch=async()=>{

    const resp =await fetch(`http://localhost:3000/api/v1/listing/get?type=rent&limit=3`,{method:'GET',headers:{'Content-Type': 'application/json' }, credentials: 'include' })
    const data=await resp.json()
    setrentlistings(data)

  }
  offerfetch()

  },[])

  
  return (
    <div>
    <div className='flex flex-col gap-6 p-32 px-3 max-w-6xl mx-auto'> 
      {/* part-1*/}
      <h1 className="text-3xl lg:text-6xl text-slate-800 font-bold">
        Find your next <span className="text-slate-400">Perfect</span>
        <br></br>place with ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm">
        <p >Magestic Acres is the bext place to find your next perfect place.</p>
        <p >We have a wide range of properties for you to choose from</p>
        </div>
        <Link to={'/search'} className="font-bold text-xs sm:text-sm text-blue-700  hover:underline">Lets get started...</Link>
    </div>
    <Swiper navigation>
    {
      offerlistings && offerlistings.length>0 &&
      offerlistings.map((listing)=>(
        <SwiperSlide key={listing}>
          <div style={{background:`url(${listing.imageUrl[0]}) center no-repeat`,backgroundSize:'cover'}}
          className="h-[200px] md:h-[450px]"
          ></div>
        </SwiperSlide>
      ))
    }
  </Swiper>
  <div className="flex flex-col max-w-6xl mx-auto  my-10 gap-8 p-3">

    {
      offerlistings && offerlistings.length>0 && (
        <div>
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-700">
              Recently added Properties with offers
            </h2>
            <Link  className='text-sm text-blue-800 hover:underline' to={'/search?offer=true&sort=createdAt&order=desc'}>Show more</Link>
            
             </div>
             <div className="flex flex-wrap gap-10"> 
              {offerlistings.map(listing=><List key={listing} listing={listing}/>)}
             </div>
           </div>
      )
    }
     {
      salelistings && salelistings.length>0 && (
        <div>
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-700">
              Recently added Properties for SALE
            </h2>
            <Link  className='text-sm text-blue-800 hover:underline' to={'/search?type=sale&sort=createdAt&order=desc'}>Show more</Link>
            
             </div>
             <div className="flex flex-wrap gap-10"> 
              {salelistings.map(listing=><List key={listing} listing={listing}/>)}
             </div>
           </div>
      )
    }
     {
      rentlistings && rentlistings.length>0 && (
        <div>
          <div className="my-3">
            <h2 className="text-2xl font-semibold text-slate-700">
              Recently added Properties for RENT
            </h2>
            <Link  className='text-sm text-blue-800 hover:underline' to={'/search?offer=true&sort=createdAt&order=desc'}>Show more</Link>
            
             </div>
             <div className="flex flex-wrap gap-10"> 
              {rentlistings.map(listing=><List key={listing} listing={listing}/>)}
             </div>
           </div>
      )
    }

  </div>

    </div>
  )
}

export default Home
