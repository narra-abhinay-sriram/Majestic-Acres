import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import List from '../components/List'

export default function Search() {
    const navigate=useNavigate()
    const[load,setload]=useState()
    const [listings,setlistings]=useState([])
    const [showmore,setshowmore]=useState(false)
    console.log(listings)
    const [searchdata ,setsearchdata]=useState({
        searchterm:'',
        offer:false,
        parking:false,
        furnished:false,
        type:'all',
        sort:'createdAt',
        order:'desc'
    })
    const handlechange=(e)=>{

if(e.target.id=='searchterm')
{
    setsearchdata({...searchdata,searchterm:e.target.value})
}
if(e.target.id=='offer' || e.target.id=='parking' || e.target.id=='furnished')
{
    setsearchdata({...searchdata,[e.target.id]:e.target.checked})
}
if(e.target.id=='all' || e.target.id=='rent' || e.target.id=='sale')
{
    setsearchdata({...searchdata,type:e.target.id})
}
if(e.target.id=='sort_order')
{
    setsearchdata({...searchdata,sort:e.target.value.split('_')[0] ,order:e.target.value.split('_')[1]})
}

    }

    const handlesubmit=(e)=>{
        e.preventDefault()

const urlparams=new URLSearchParams(window.location.search)
urlparams.set('searchterm',searchdata.searchterm)
urlparams.set('offer',searchdata.offer)
urlparams.set('parking',searchdata.parking)
urlparams.set('furnished',searchdata.furnished)
urlparams.set('type',searchdata.type)
urlparams.set('sort',searchdata.sort)
urlparams.set('order',searchdata.order)
const searchquery=urlparams.toString()
//console.log(searchquery)
navigate(`/search?${searchquery}`)


    }
    useEffect(()=>{

        const urlparams=new URLSearchParams(location.search)
        const searchparam=urlparams.get('searchterm')
        const offerparam=urlparams.get('offer')==='true'
            const parkingparam=urlparams.get('parking')==='true'
            const furnishedparam=urlparams.get('furnished')==='true'
            const typeparam=urlparams.get('type')
            const sortpara=urlparams.get('sort')
            const orderparam=urlparams.get('order')

            if(searchparam||offerparam||parkingparam||furnishedparam||typeparam||sortpara||orderparam)
            {
                setsearchdata({
                    searchterm:searchparam||'',
                    offer:offerparam||false,
                    parking:parkingparam||false,
                    furnished:furnishedparam||false,
                    type:typeparam||'all',
                    sort:sortpara||'createdAt',
                    order:orderparam||'desc'
                })
            }
            const fetchlist=async()=>{

                setload(true)
                setshowmore(false)
                
                const searchquery=urlparams.toString()
                //console.log(searchquery)
                const resp=await fetch(`http://localhost:3000/api/v1/listing/get?${searchquery}`,{
                                        method:'GET',
                                        headers:{
                                                  'Content-Type': 'application/json',
                                                },
                                         credentials: 'include',
                                        })
                const data=await resp.json()
                if(data.length>8)
                {
                    setshowmore(true)
                }
                setlistings(data)
                setload(false)
                         }
            fetchlist()

        
    },[location.search])
    const showmoreclick= async()=>{
        const numberoflistings=listings.length
        const startindex=numberoflistings
        const urlparams=new URLSearchParams(location.search)
        urlparams.set('startindex',startindex)

            setload(true)
            setshowmore(false)
            
            const searchquery=urlparams.toString()
            //console.log(searchquery)
            const resp=await fetch(`http://localhost:3000/api/v1/listing/get?${searchquery}`,{
                                    method:'GET',
                                    headers:{
                                              'Content-Type': 'application/json',
                                            },
                                     credentials: 'include',
                                    })
            const data=await resp.json()
            if(data.length>8)
            {
                setshowmore(true)
            }else setshowmore(false)
            setlistings([...listings,...data])
            console.log(listings)
            setload(false)
                     
           
        
    }


  return (
    <div className='flex flex-col md:flex-row'>
      <div className='p-8 border-b-2 md:border-r-2 md:min-h-screen md:min-w-[28%]'>
        <form  onSubmit={handlesubmit} className='flex flex-col gap-8'>
     <div className='flex items-center gap-3'>
        <label className='font-semibold whitespace-nowrap'>Search Term:</label>
        <input 
        id='searchterm'
        type='text' placeholder='Search for listings..' 
        className='p-3  rounded-lg w-full border' 
        onChange={handlechange}
        value={searchdata.searchterm}
        />
    </div>
    <div className='flex gap-2 flex-wrap items-center'>
        <label className='font-semibold'>Type:</label>
        <div className='flex gap-2'>
        <input type='checkbox' id='all' className='w-5' onChange={handlechange} checked={searchdata.type==='all'}  />
        <span>Rent and Sale</span>
        </div>
        <div className='flex gap-2'>
        <input type='checkbox' id='rent' className='w-5' onChange={handlechange} checked={searchdata.type==='rent'}  />
        <span>Rent</span>
        </div>
        <div className='flex gap-2'>
        <input type='checkbox' id='sale' className='w-5' onChange={handlechange} checked={searchdata.type==='sale'}  />
        <span>Sale</span>
        </div>
        <div className='flex gap-2'> 
        <input type='checkbox' id='offer' className='w-5' onChange={handlechange} checked={searchdata.offer} />
        <span>Offer</span>
        </div>
    </div>
     <div className='flex gap-2'>
        <label className='font-semibold'>Amenities:</label >
        <div className='flex gap-2'> 
        <input type='checkbox' id='furnished' className='w-5' onChange={handlechange} checked={searchdata.furnished}  />
        <span>Furnished</span>
        </div>
        <div className='flex gap-2'> 
        <input type='checkbox' id='parking' className='w-5' onChange={handlechange} checked={searchdata.parking} />
        <span>Parking</span>
        </div>
     </div>
     <div className='flex gap-3 items-center'> 
        <label className='font-semibold'>Sort:</label>
        <select id='sort_order' className='border rounded-lg p-3' onChange={handlechange} value={`${searchdata.sort}_${searchdata.order}`}>
            <option value='regularPrice_desc' >Price high to low</option>
            <option value='regularPrice_asc'>Price low to high</option>
            <option value='createdAt_desc'>Latest listings</option>
            <option value='createdAt_asc'>Oldest listings</option>
         </select>
     </div>
     <button className='bg-slate-700 text-white uppercase w-full p-2 text-lg rounded-lg hover:opacity-80'>Search</button>
 </form>
      </div>
      <div> 
     <h1 className='text-3xl font-bold p-3 text-slate-700 mt-5'>
        Search Results
     </h1>
     <div className='p-8 flex flex-wrap gap-4'>
     {!load && listings.length==0 && <p className='text-xl text-slate-700 mx-auto text-center w-full'>No properties matched your search <b className='text-2xl'>:{'('}</b> </p>}
   {load &&  <p className='text-xl text-slate-700 text-center w-full'>
              Loading...
            </p>}
            {!load && listings.length>0 && listings.map(listing=><List key={listing._id} listing={listing} />)}
            {showmore &&
                <button
                 onClick={showmoreclick}
                  className='text-green-800 hover:underline p-7 w-full'>show more
                  
               </button>

            }
     </div>
      </div>
    </div>
  )
}
