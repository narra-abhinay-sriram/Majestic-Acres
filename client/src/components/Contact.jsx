import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {


const [landlord,setlandlord]=useState(null)
const [message,setmessage]=useState('')
//console.log(listing)
  
useEffect(()=>{
const fetchuser=async()=>{

    const resp=await fetch("http://localhost:3000/api/v1/user/get/"+listing.userRef,{method:'GET',
    headers: {
    'Content-Type': 'application/json', 
  },credentials: 'include',})
  const data=await resp.json()
  //console.log(data)
  setlandlord(data)

}
fetchuser()

},[listing.userRef])

const messagechange=(e)=>{
    setmessage(e.target.value)
}

  return (
    <div>
        {landlord && 
        <div>
        <p className='text-slate-700 '><b className='text-black '>Property Owner-{' '}</b>{landlord.username}</p>

        <textarea name='message' id='message' rows='2' value={message} placeholder='Enter your Message here' className='w-full p-3 border rounded-lg mt-1 mb-5' onChange={messagechange} ></textarea>
        
        <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
        
        className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 mt-2'
       > Send Message</Link>
        </div>
        }
    </div>
  )
}
