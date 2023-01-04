import React from 'react'
import {useState} from 'react'
import {useAuth} from '../context/authContext'
import {Link, useNavigate} from 'react-router-dom'
import { Alert } from './Alert'

const Register = () => {

  const [user, setUser]= useState({
    email:'',
    password:'',
  })
  const {signup} = useAuth()
  const navigate = useNavigate()
  const [error, setError]= useState();

  const handleChange = ({target:{name, value}}) => 
    setUser({...user,[name]: value})
    //funcion asincrona a bd se le añade async await
  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')
    try{
      await signup (user.email, user.password)
      navigate('/')
    }
    catch(error){
      if(error.code ==="auth/weak-password"){
        setError('Necesita tener mas de 6 caracteres')
      }
      else if(error.code ==="auth/invalid-email"){
        setError('Necesita tener un correo valido')
      }
      else{
        setError(error.message) 
      }
    }
  }

  return (
  <div className='w-full max-w-xs m-auto '>
   {error && <Alert message={error}/>}
   <p className='sm:p-10'></p>
   <p className='text-black text-sm-300 text-center sm:p-5'>Registrar una cuenta.</p>
   <form onSubmit={handleSubmit}className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
   <div className='mb-4'>
   <label htmlFor="email" className='block text-gray-700 text-sm font-fold mb-2'>Email</label>
   <input 
   type="email" 
   name="email" 
   placeholder="email@compania.com"
   className='shadow appearance-none boder rounded w-full
      py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
   onChange={handleChange}
   />
   </div>

   <div className='mb-4'>
   <label htmlFor="password"className='block text-gray-700 text-sm font-fold mb-2' >Password</label>
   <input 
   type="password" 
   name="password" 
   id="password"
   placeholder="******"
   className='shadow appearance-none boder rounded w-full
      py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
   onChange={handleChange}
   />
   </div>

   <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold
    text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Registrar</button>
  </form>
  <p className='text-black my-2 text-sm flex justify-between'>Ya tienes una cuenta!. <Link to= '/Login'>Login</Link></p>
  </div>
  )
}

export default Register