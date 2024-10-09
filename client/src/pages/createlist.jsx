import React from 'react'

export default function Createlist() {
  return (
    <main className='p-3 max-w-4xl mx-auto'>
<h1 className='text-3xl font-semibold my-7 text-center'>
    Create Listing
</h1>
<form className='flex flex-col sm:flex-row gap-4' >

<div className='flex flex-col gap-4 flex-1'>
    <input type='text' placeholder='Title' id='name' className='p-3 border rounded-lg' required minLength='10' maxLength='64' />
    <textarea type='text' placeholder='description' id='description' className='p-3 border rounded-lg' required  />
    <input type='text' placeholder='address' id='address' className='p-3 border rounded-lg' required  />

    <div className='flex gap-6 flex-wrap'>
        <div className='flex gap-2'>
            <input type='checkbox' id='sale' className='w-5' />
            <span>Sell</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='rent' className='w-5' />
            <span>Rent</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='parking' className='w-5' />
            <span>Parking</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='furnished' className='w-5' />
            <span>Furnished</span>
        </div>
        <div className='flex gap-2'>
            <input type='checkbox' id='offer' className='w-5' />
            <span>Offer</span>
        </div>
    </div>

    <div className='flex gap-8 flex-wrap'>
        <div className='flex items-center gap-2'>
            <input type='number' id='bedrooms' min='1' max='10' required className='p-3 w-16 h-8 border border-gray-600 rounded-lg' />
            <span>BedRooms</span>
        </div>
        <div className='flex items-center gap-2'>
            <input type='number' id='bathrooms' min='1' max='10' required className='p-3 w-16 h-8 border border-gray-600 rounded-lg' />
            <span>BathRooms</span>
        </div>
        <div className='flex flex-row items-center  '>
            <input type='number' id='regularPrice' min='1' required className='p-3 w-16 h-10 border border-gray-600 rounded-lg' />
            <div className='flex flex-col items-center ml-2'>
                <span>Regular Price</span>
            <p className='text-xs'>₹ /month</p>
            </div>
        </div>
        <div className='flex  flex-row items-center  '>
            <input type='number' id='discountPrice' min='1' required className='p-3 w-16 h-10 border border-gray-600 rounded-lg' />
            <div className='flex flex-col items-center ml-2'>
                <span>Discounted Price</span>
            <p className='text-xs'>₹ /month</p>
            </div>
        </div>
    </div>


</div>

<div className='flex flex-col gap-4 flex-1'>

    <p className='font-bold'>Images:
        <span className='font-normal text-gray-800 ml-2'>The First image will be the cover (max6)</span>
    </p>
    <div className='flex gap-4'>

        <input  type='file' id='images'  accept='/image/*' multiple className='p-3 border  border-gray-400 rounded w-full' />
        <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:opacity-65 disabled:opacity-15 hover:shadow-xl '>
        UPLOAD
        </button>

    </div>

    <button className='bg-gray-800 text-white rounded-md hover:opacity-80 uppercase disabled:opacity-70 p-3'>
    create listing
    </button>

</div>


</form>

    </main>
  )
}
