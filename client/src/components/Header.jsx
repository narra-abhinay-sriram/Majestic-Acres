import React from 'react'
import {FaSearch} from "react-icons/fa"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Header() {
const {currentuser}=useSelector(store=>store.user)
console.log(currentuser)

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
            <div className='font-bold text-sm sm:text-xl flex-wrap'>
                <Link to={"/"}>
            <span className='text-slate-500'>Majestic </span>
            <span className='text-slate-700'>Acres</span></Link>
            </div>
         <form className='bg-slate-100  rounded-md p-3 flex items-center'>
        <input  type='text' placeholder='Search....'  className='bg-transparent focus:outline-none w-24 sm:w-64'/>
        <FaSearch/>
        </form>
        <ul className='flex gap-8'>
           <Link to={"/"}><li className='hidden sm:inline text-slate-800 hover:underline'> Home</li></Link> 
          <Link to={"about"}>  <li className='hidden sm:inline text-slate-800 hover:underline'>About</li></Link> 
          <Link to={"/profile"}> 
          {currentuser?
          (<img  className='rounded-full h-7 w-7 object-cover' src={currentuser.avatar} alt='profile'/>)
          :(<li className='hidden sm:inline text-slate-800 hover:underline'>Sign In</li>)}
           </Link> 
        </ul>
        
        </div>
    </header>
  )
}
