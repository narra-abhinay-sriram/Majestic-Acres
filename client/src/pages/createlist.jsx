import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useState } from 'react'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Createlist() {
    const {currentuser}=useSelector(store=>store.user)


const [files,setfliles]=useState([])
const [formdata,setformdata]=useState({
    imageUrl:[],
    name:'',
    description:'',
    address:'',
    regularPrice:0,
    discountedPrice:0,
    bedrooms:0,
    bathrooms:0,
    furnished:false,
    parking:false,
    type:"rent",
    offer:false,
})
//console.log(formdata)

const [imageerror,setimageerror]=useState("")
const [uploadimage,setuploadimage]=useState(false)
const [submitload,setsubmitload]=useState(false)
const [submiterror,setsubmiterror]=useState("")

const navigate=useNavigate()


const handleimagesubmit=(e)=>{
    e.preventDefault()
 if(files.length>0 && files.length + formdata.imageUrl.length   <7)

    {
        setuploadimage(true)
        setimageerror("")
        const promises=[]
        for(let i=0;i<files.length;i++)
        {
            promises.push(storeImage(files[i]))
        }
        Promise.all(promises).then((url)=>{
            setformdata({...formdata,imageUrl:formdata.imageUrl.concat(url)})
            setimageerror("")
            setuploadimage(false)
            
        }).catch((e)=>{
            setimageerror("image upload failed (3MB max)")
            setuploadimage(false)
        })
    }else {
        setimageerror("you can upload a maximum of 6 images")
        setuploadimage(false)
    }

}
const storeImage=async(file)=>{

return new Promise ((resolve,reject)=>{

const storage=getStorage(app)
const filename=new Date().getTime() + file.name 

const storageRef=ref(storage,filename)
const uploadTask=uploadBytesResumable(storageRef,file)
uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    },
    (error) => {
      reject(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
        resolve(downloadURL)      );
    }
  );

})
}

const handledeleteimage=(index)=>{
    setformdata({
        ...formdata,
        imageUrl:formdata.imageUrl.filter((_,i)=>i!=index)
    })


}
const handlechange=(e)=>{

if(e.target.id=='sale' || e.target.id=='rent')
{

    setformdata({
        ...formdata,
        type:e.target.id
    })
}

if(e.target.id=='furnished' || e.target.id=='parking' || e.target.id=='offer')
{
    setformdata({
        ...formdata,
        [e.target.id]:e.target.checked
    })
}

if(e.target.type==='number' || e.target.type==='text' || e.target.type==='textarea')
{
    setformdata({
        ...formdata,
        [e.target.id]:e.target.value
    })
}


}

const handlesubmit=async(e)=>{
    e.preventDefault()
if(formdata.imageUrl.length<1)
    return setsubmiterror("Upload atleast One image")
if(Number(formdata.regularPrice)<Number(formdata.discountedPrice))
{
    return setsubmiterror("Discounted price must be less than regular price")
}

    setsubmitload(true)
    const res=await fetch("http://localhost:3000/api/v1/listing/create/",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body:JSON.stringify({
            ...formdata,
            userRef:currentuser._id
        })
    })

    const data=await res.json()
    //console.log(data)
    if(data.success=='false'){

        setsubmiterror(data.message)
        setsubmitload(false)
    }
    setsubmitload(false)
    setsubmiterror('')
    navigate(`/listing/${data.listing._id}`)

}


  return (
    <main className='p-3 max-w-4xl mx-auto'>
         <h1 className='text-3xl font-semibold my-7 text-center'>
               Create Listing
         </h1>
       <form onSubmit={handlesubmit}
         className='flex flex-col sm:flex-row gap-4' >

         <div className='flex flex-col gap-4 flex-1'>
    <input onChange={handlechange} value={formdata.name}
    type='text' placeholder='name' id='name' className='p-3 border rounded-lg' required minLength='10' maxLength='64' />
    <textarea onChange={handlechange} value={formdata.description}
    type='text' placeholder='description' id='description' className='p-3 border rounded-lg' required  />
    <input onChange={handlechange} value={formdata.address}
     type='text' placeholder='address' id='address' className='p-3 border rounded-lg' required  />

    <div className='flex gap-6 flex-wrap'>
        <div className='flex gap-2'>
            <input type='checkbox' id='sale' className='w-5' onChange={handlechange} checked={formdata.type==='sale'}/>
            <span>Sell</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='rent' className='w-5'  onChange={handlechange} checked={formdata.type==='rent'}/>
            <span>Rent</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='parking' className='w-5' onChange={handlechange} checked={formdata.parking} />
            <span>Parking</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='furnished' className='w-5' onChange={handlechange} checked={formdata.furnished}/>
            <span>Furnished</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='offer' className='w-5'onChange={handlechange} checked={formdata.offer} />
            <span>Offer</span>
        </div>
    </div>

    <div className='flex gap-8 flex-wrap'>
        <div className='flex items-center gap-2'>
            <input type='number' id='bedrooms' min='1' max='10' required className='p-3 w-16 h-8 border border-gray-600 rounded-lg' onChange={handlechange} value={formdata.bedrooms} />
            <span>BedRooms</span>
        </div>
        <div className='flex items-center gap-2'>
            <input type='number' id='bathrooms' min='1' max='10' required className='p-3 w-16 h-8 border border-gray-600 rounded-lg' onChange={handlechange} value={formdata.bathrooms} />
            <span>BathRooms</span>
        </div>
        <div className='flex flex-row items-center  '>
            <input type='number' id='regularPrice' min='1' max='1000000000000000000000000000000' required className='p-3 w-28 h-10 border border-gray-600 rounded-lg' onChange={handlechange} value={formdata.regularPrice} />
            <div className='flex flex-col items-center ml-2'>
                <span>Regular Price</span>
            { formdata.type=='rent' && <p className='text-xs'>₹ /month</p>}
            </div>
        </div>
        {
        formdata.offer &&
        <div className='flex  flex-row items-center  '>
        <input type='number' id='discountedPrice' min='0' max='10000000000000000' required className='p-3 w-28 h-10 border border-gray-600 rounded-lg' onChange={handlechange} value={formdata.discountedPrice} />
        <div className='flex flex-col items-center ml-2'>
            <span>Discounted Price</span>
            { formdata.type=='rent' && <p className='text-xs'>₹ /month</p>}
        </div>
    </div>
        
        }
       
    </div>


         </div>

    <div className='flex flex-col gap-4 flex-1'>

         <p className='font-bold'>Images:
          <span className='font-normal text-gray-800 ml-2'>The First image will be the cover (max6)</span>
        </p>
      <div className='flex gap-4'>

          <input onChange={(e)=>setfliles(e.target.files)}
             type='file' id='images'  accept='/image/*' multiple className='p-3 border  border-gray-400 rounded w-full' />
           <button disabled={uploadimage}
           onClick={handleimagesubmit}
             className='p-3 text-green-700 border border-green-700 rounded uppercase hover:opacity-65 disabled:opacity-15 hover:shadow-xl '>
              {uploadimage ? "Uploading...":"Upload"}
           </button>



       </div>
       <p className='text-red-700'>{imageerror && imageerror}</p>
       {
        formdata.imageUrl.length>0 && formdata.imageUrl.map((url,index)=>(
        <div key={url} className='flex justify-between border p-3 items-center'>
     <img src={url} alt='listing image'  className='w-20 h-20 object-contain rounded-md'/>
     <button onClick={()=>handledeleteimage(index)}
       className='text-red-600 text-lg p-3 uppercase hover:opacity-55'>Delete</button>

        </div>))
       }


         <button className='bg-gray-800 text-white rounded-md hover:opacity-80 uppercase disabled:opacity-70 p-3'>
            {submitload ? "creating...":"create Listing"}
         </button>
         {submiterror && <p className='text-red-700'>{submiterror}</p>}

     </div>


</form>

    </main>
  )
}
