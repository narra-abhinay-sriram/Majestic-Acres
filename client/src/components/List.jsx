import React from 'react'
import {  FaMapMarkerAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

export default function List({listing}) {
  return (
    <div className='bg-white rounded-lg shadow-md hover:shadow-lg overflow-hidden w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
      <img src={listing.imageUrl[0]}
          className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
          />
          <div className='flex flex-col p-3 gap-4 w-full'>
            <p className='truncate font-semibold text-slate-700 text-lg'>{listing.name}</p>
            <div className='gap-2 flex items-center '> 
                <FaMapMarkerAlt className='text-green-800' />
                <span className='line-clamp-1 text-sm text-gray-600 w-full'>{listing.address}</span>
                 </div>
                 <p className='text-sm text-gray-600 line-clamp-2'>
                    {listing.description}
                 </p>
                 <p className='text-slate-500 mt-2 text-md font-semibold'>
                    {' ₹ '+listing.regularPrice.toLocaleString('en-US')}
                    {listing.type=='rent' && ' / Month'}
                 </p>
                 <div className='flex gap-4 items-center text-slate-700'>
                    <p className='font-bold text-sm text-slate-600'>
                        {listing.bedrooms>1 ? listing.bedrooms+' Beds':listing.bedrooms+' Bed' }
                    </p>
                    <p className='font-bold text-sm text-slate-600'>
                        {listing.bathrooms>1 ? listing.bathrooms+' Baths':listing.bathrooms+' Bath' }
                    </p>
                 </div>

          </div>
      </Link>
    </div>
  )
}
