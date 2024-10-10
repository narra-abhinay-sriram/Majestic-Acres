import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL,getStorage,ref,uploadBytesResumable,} from 'firebase/storage';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { deletefailure, deletestart, deletesuccess, startupdate, updatefailure, updatesuccess } from '../redux/userSlice';
import { Link } from 'react-router-dom';

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
const[listshowload,setlistshowload]=useState(false)
const[listshowerror,setlistshowerror]=useState('')
const [userlistings,setuserlistings]=useState([])

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

const handlesignout=async()=>{

const res=await fetch("http://localhost:3000/api/v1/user/signout/",{
  method:"POST",
  headers:{
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  
})

  const data=await res.json()
  if(data.success=="false")
    {
      dispatch(deletefailure(data))
      return
    }
    
    dispatch(deletesuccess())

}

const handleshowlistings=async()=>{

  setlistshowload(true)
  const resp=await fetch('http://localhost:3000/api/v1/listing/show/'+currentuser._id,
  {
    method:'GET',
    headers:{
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
const data=await resp.json()
//console.log(data.listing)
setuserlistings(data.listing)
if(data.success=="false")
{
  setlistshowerror(data.message)
  setlistshowload(false)
}

setlistshowerror('')
  setlistshowload(false)
}

const handledeletelisting=async(listing)=>{

const resp=await fetch('http://localhost:3000/api/v1/listing/delete/'+listing,{
  method:'DELETE',
  headers:{
    'Content-Type': 'application/json',
  },
  credentials: 'include',
})

const data=await resp.json()

if(data.success!='false')
{
 
  setuserlistings((prev)=>prev.filter((list)=>list._id!=listing))
  
}

}


//console.log(userlistings)

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
  <Link to={"/createlisting"} className='bg-green-700 text-white uppercase rounded-md hover:opacity-75 p-3 text-center'>
  create listing
</Link>
  </form>
 
  <p className='text-red-900 text-center'>
  {error && typeof error === 'object' ? error.message : error}
</p>
<p className='text-green-700 text-center'>{update?"User is updated successfully":""}</p>


     
<div className='flex justify-between mt-3'>
<span  onClick={handledelete} className='text-red-600 cursor-pointer font-semibold'> Delete Account</span>
<span onClick={handlesignout} className='text-red-600 cursor-pointer font-semibold'> Sign Out</span>


</div>
<button disabled={listshowload}
onClick={handleshowlistings} className='text-green-800 w-full uppercase font-semibold '>
  {listshowload ?"Getting listings":"Show Listings"}</button>
  {listshowerror && <p className='text-red-800'>{listshowerror}</p>}

  {userlistings && userlistings.length>0 && userlistings.map((listing)=>(
    <div key={listing._id} className='border border-gray-300 rounded-lg p-4 my-2 flex justify-between items-center gap-4'>

<Link to={`/listing/${listing._id}`}>
<img 
 src={listing.imageUrl[0]} alt='listing img' className='w-16 h-16 object-cover'  />
 </Link>
 <Link to={`/listing/${listing._id}`} className='text-slate-900 font-semibold hover:underline truncate flex-1'>
<p>{listing.name}</p>
 </Link>
 <div className='flex flex-col items-center'>
  <button onClick={()=>handledeletelisting(listing._id)}  className='text-red-600 uppercase'>
    delete
  </button>

  <Link to={`/Editlist/${listing._id}`}><button className='text-green-800 uppercase'>Edit</button></Link>
  
   </div>


    </div>
  ))}

    </div>
  )
}

export default Profile
