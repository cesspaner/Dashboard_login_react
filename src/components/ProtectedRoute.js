import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext"

export  function ProtectedRoute({children}){
const {user,loading}= useAuth()
  if(loading)return <h1 className='text-left hover:text-center'>loading...</h1>
  if(!user) return <Navigate to='/login'/>
  return <>{children}</>
}


