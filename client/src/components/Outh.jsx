import React from 'react'
import {GoogleAuthProvider,getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux'
import { signsuccess } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

export default function Outh() {
    const dispatch=useDispatch()
const navigate=useNavigate()
const handleclick=async()=>{

   
    try{
        const provider=new GoogleAuthProvider()
        const auth=getAuth(app)
        const results= await signInWithPopup(auth,provider)

        const resp=await fetch("http://localhost:3000/api/v1/user/google",{method:'POST',headers: {
            'Content-Type': 'application/json', 
          },
        body:JSON.stringify({username:results.user.displayName,email:results.user.email,photo:results.user.photoURL})
        
        })

        const data=await resp.json()
        console.log(data)

        dispatch(signsuccess(data.rest))
navigate("/")


    }catch(e){
        console.log(e)

    }

}

  return (
    
      <button 
      onClick={handleclick}
      type='button' className='bg-red-800 text-white uppercase hover:opacity-90 p-3 rounded-md'>Continue with Google</button>
    
  )
}
