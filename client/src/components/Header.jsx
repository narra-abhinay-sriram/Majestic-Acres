import React, { useEffect, useState } from 'react'
import {FaSearch} from "react-icons/fa"
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

export default function Header() {
  const navigate=useNavigate()
const {currentuser}=useSelector(store=>store.user)
const [searchterm,setsearchterm]=useState('')
//console.log(searchterm)
//console.log(currentuser)
const handlesubmit=(e)=>{

  e.preventDefault()

const urlparams=new URLSearchParams(window.location.search)
urlparams.set("searchterm",searchterm)
const searchquery=urlparams.toString()
navigate(`/search?${searchquery}`)

}



useEffect(()=>{

const urlsearchparams=new URLSearchParams(location.search)
const searchtermparam=urlsearchparams.get('searchterm')
if(searchtermparam!==null)
  setsearchterm(searchtermparam)
},[location.search])


  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
            <div className='font-bold text-sm sm:text-xl flex-wrap'>
                <Link to={"/"}>
            <span className='text-slate-500'>Majestic </span>
            <span className='text-slate-700'>Acres</span></Link>
            </div>
         <form onSubmit={handlesubmit} className='bg-slate-100  rounded-md p-3 flex items-center'>
        <input onChange={(e)=>setsearchterm(e.target.value)} value={searchterm} type='text' placeholder='Search....'  className='bg-transparent focus:outline-none w-24 sm:w-64'/>
       <button type='submit'><FaSearch/></button> 
        </form>
        <ul className='flex gap-8 items-center'>
           <Link to={"/"}><li className='hidden sm:inline text-slate-800 hover:underline'> Home</li></Link> 
          <Link to={"about"}>  <li className='hidden sm:inline text-slate-800 hover:underline'>About</li></Link> 
          <Link to={"/profile"}> 
          {currentuser?
          (<img  className='rounded-full h-10 w-10 object-cover' src={currentuser.avatar} alt='profile'/>)
          :(<li className='hidden sm:inline text-slate-800 hover:underline'>Sign In</li>)}
           </Link> 
        </ul>
        
        </div>
    </header>
  )
}
