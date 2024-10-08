import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'


export default function Privateroute() {
const {currentuser}=useSelector(store=>store.user)

  return currentuser? <Outlet/> : <Navigate to='/signin'/>
}
