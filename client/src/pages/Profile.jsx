import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL,getStorage,ref,uploadBytesResumable,} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { deletefailure, deletestart, deletesuccess, startupdate, updatefailure, updatesuccess } from '../redux/userSlice';

const Profile = () => {

const {currentuser,load,error}=useSelector(store=>store.user)
//console.log("http://localhost:3000/api/v1/user/update/"+currentuser._id)
const dispatch=useDispatch()
const fileref=useRef()
const [file,setfile]=useState(undefined)
const [fileperc,setfileperc]=useState(0)
const [formdata,setformdata]=useState({})
const [uploaderror,setuploaderror]=useState(false)
const [update,setupdate]=useState(false)
//console.log(formdata)



useEffect(()=>{

if(file && handleFileSize(file)){
  handlefile();} 
  else if(file) setuploaderror(true)

},[file])

const handleFileSize = (file) => {
  const maxSize = 3 * 1024 * 1024; // 3 MB
  return file.size <= maxSize;
};

const handlefile=()=>{
  const storage=getStorage(app)
  const filename=new Date().getTime()+file.name
  const storageRef = ref(storage, filename);
  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setfileperc(Math.round(progress));
    },
    (error) => {
      setuploaderror(true);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        setformdata({ ...formdata, avatar: downloadURL })
      );
    }
  );
}

const handlechange=(e)=>{

setformdata({...formdata,[e.target.id]:e.target.value})

}

const handlesubmit=async(e)=>{
  e.preventDefault()

  dispatch(startupdate())

//console.log(formdata.avatar)
const resp=await fetch("http://localhost:3000/api/v1/user/update/"+currentuser._id,
  {
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body:JSON.stringify(formdata)
})

const data=await resp.json()
//console.log(data)
if(data.success=="false")
{
  dispatch(updatefailure(data.message))
  setupdate(false)
  return
}
dispatch(updatesuccess(data.rest))  
setupdate(true)

  
}

const handledelete=async()=>{

dispatch(deletestart())

const resp=await fetch("http://localhost:3000/api/v1/user/delete/"+currentuser._id,
  {
    method:'DELETE',
    headers:{
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  }
)

const data=await resp.json()
//console.log(data)
 
if(data.success=="false")
{
  dispatch(deletefailure(data))
  return
}

dispatch(deletesuccess())

}



  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h2 className='font-bold text-3xl text-center my-5'>Profile</h2>
  <form onSubmit={handlesubmit}
  className='flex flex-col  gap-4'>

<input onChange={(e)=>{
  const selectedfile=e.target.files[0]
  setfileperc(0)
  setuploaderror(false)
  setfile(selectedfile)
  }}  type='file' ref={fileref}  hidden accept='image/*' />

<img onClick={()=>fileref.current.click()}
 src={formdata.avatar || currentuser.avatar}  className='rounded-full h-24 w-24 object-cover cursor-pointer mt-2 self-center'  />

<p className='text-sm self-center'>

{uploaderror?(<span className='text-red-600'>Error image upload (image must be less than 3 MB)</span>)
: fileperc >0 && fileperc <100 ? (<span className='text-slate-500'>{`uploading ${fileperc}%`}</span>)
:fileperc==100 ?(<span className='text-green-600'>Image uploaded Successfully</span>):("")
}

</p>


<input onChange={handlechange} type='text' defaultValue={currentuser.username} placeholder='username' id='username'  className='border p-3 rounded-lg'/>
<input onChange={handlechange} type='text'defaultValue={currentuser.email} placeholder='email' id='email' className='border p-3 rounded-lg' />
<input onChange={handlechange} type='password' placeholder='password' id='password' className='border p-3 rounded-lg' />
<button className='bg-slate-700 p-3 hover:opacity-85 text-white uppercase rounded-lg'>
  Update
  </button>

  </form>
 
  <p className='text-red-900 text-center'>
  {error && typeof error === 'object' ? error.message : error}
</p>
<p className='text-green-700 text-center'>{update?"User is updated successfully":""}</p>
     
<div className='flex justify-between mt-3'>
<span  onClick={handledelete} className='text-red-600 cursor-pointer font-semibold'> Delete Account</span>
<span className='text-red-600 cursor-pointer font-semibold'> Sign Out</span>


</div>

    </div>
  )
}

export default Profile
