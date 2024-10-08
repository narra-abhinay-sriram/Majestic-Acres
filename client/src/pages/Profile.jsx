import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {getDownloadURL,getStorage,ref,uploadBytesResumable,} from 'firebase/storage';
import { app } from '../firebase';

const Profile = () => {

const {currentuser}=useSelector(store=>store.user)

const fileref=useRef()
const [file,setfile]=useState(undefined)
const [fileperc,setfileperc]=useState(0)
const [formdata,setformdata]=useState({})
const [uploaderror,setuploaderror]=useState(false)



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


  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h2 className='font-bold text-3xl text-center my-5'>Profile</h2>
      <form className='flex flex-col  gap-4'>
<input onChange={(e)=>{
  const selectedfile=e.target.files[0]
  setfileperc(0)
  setuploaderror(false)
  setfile(selectedfile)
  }}  type='file' ref={fileref}   hidden accept='image/*' />

<img onClick={()=>fileref.current.click()}
 src={formdata.avatar || currentuser.avatar} className='rounded-full h-24 w-24 object-cover cursor-pointer mt-2 self-center'  />

<p className='text-sm self-center'>

{uploaderror?(<span className='text-red-600'>Error image upload (image must be less than 3 MB)</span>)
: fileperc >0 && fileperc <100 ? (<span className='text-slate-500'>{`uploading ${fileperc}%`}</span>)
:fileperc==100 ?(<span className='text-green-600'>Image uploaded Successfully</span>):("")
}

</p>


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
