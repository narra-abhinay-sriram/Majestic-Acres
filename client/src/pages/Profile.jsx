import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

const {currentuser}=useSelector(store=>store.user)

  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h2 className='font-bold text-3xl text-center my-5'>Profile</h2>
      <form className='flex flex-col  gap-4'>
<img  src={currentuser.avatar} className='rounded-full h-24 w-24 object-cover cursor-pointer mt-2 self-center'  />
<input  type='text' placeholder='username' id='username'  className='border p-3 rounded-lg'/>
<input  type='text' placeholder='email' id='email' className='border p-3 rounded-lg' />
<input  type='password' placeholder='password' id='password' className='border p-3 rounded-lg' />
<button className='bg-slate-700 p-3 hover:opacity-85 text-white uppercase rounded-lg'>Update</button>

      </form>

<div className='flex justify-between mt-3'>
<span className='text-red-600 cursor-pointer font-semibold'> Delete Account</span>
<span className='text-red-600 cursor-pointer font-semibold'> Sign Out</span>


</div>

    </div>
  )
}

export default Profile
