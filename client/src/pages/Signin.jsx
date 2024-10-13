import React, { useState } from 'react'
import { useNavigate ,Link} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { signfailue, signsuccess, startsign } from '../redux/userSlice'
import Outh from '../components/Outh'


const Signin = () => {

const [formdata,setformdata]=useState({})

const navigate=useNavigate()
const dispatch=useDispatch()

const {currentuser,load,error}=useSelector((store)=>store.user)
//console.log(currentuser+load+error)

const handlechange=async(e)=>{


  setformdata(
    {...formdata,
      [e.target.id]:e.target.value})
}

const handleclick=async()=>{
dispatch(startsign())
  const resp=await fetch("http://localhost:3000/api/v1/user/signin",{method:'POST',
    headers:{    'Content-Type': 'application/json', 
    },
    body:JSON.stringify(formdata)})
  const data=await resp.json()
if(data.success=="false")
{
 dispatch(signfailue(data.message))
  return
}
dispatch(signsuccess(data.rest))
localStorage.setItem('token',data.token)
navigate("/")
}

  return (
    <div className='p-3 max-w-lg mx-auto'>
    <h1 className='font-bold text-3xl text-center my-7'>Sign In</h1>
    <form onSubmit={(e)=>{e.preventDefault()}} className='flex flex-col gap-4'> 
      
       <input onChange={handlechange} type='text' placeholder='email'id='email' className='border p-3 rounded-md'/>
       <input onChange={handlechange} type='password' placeholder='password'id='password' className='border p-3 rounded-md'/>
       <button disabled={load}
       onClick={handleclick}
       
       className='bg-slate-700 text-white p-3 rounded-md uppercase hover:opacity-95 disabled:opacity-55'>
          Sign In
       </button>
       <Outh/>
    </form>
    <p className='text-red-700'>{error}</p>
    <div className='flex  gap-2 mt-3'>
      <p>Don't have an account?</p>
      <Link to={"/signup"}> <p className='text-blue-600 underline'>Sign Up</p></Link>
      </div>

</div>
  )
}

export default Signin
