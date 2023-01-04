import React from 'react'
import {useState} from 'react'
import {useAuth} from '../context/authContext'
import {Link, useNavigate} from 'react-router-dom'
import { Alert } from './Alert'
import logo from '../assets/logo192.png'
import ImgGoogle from '../assets/5a951939c4ffc33e8c148af2.png'

const Login = () => {

  const [user, setUser]= useState({
    email:'',
    password:'',
  })
  const {login,loginWithGoogle} = useAuth()
  const navigate = useNavigate()
  const [error, setError]= useState();

  const handleChange = ({target:{name, value}}) => 
    setUser({...user,[name]: value})
    //funcion asincrona a bd se le añade async await
  const handleSubmit = async(e) => {
    e.preventDefault()
    setError('')
    try{
      await login (user.email, user.password)
      navigate('/Home')
    }
    catch(error){
      if(error.code ==="auth/weak-password"){
        setError('Necesita tener mas de 6 caracteres')
      }
      else if(error.code ==="auth/invalid-email"){
        setError('Necesita tener un correo valido')
      }
      else if(error.code ==="auth/wrong-password"){
        setError('Password Incorrecto')
      }
      else{
        setError(error.message) 
      }
    }
  }

  const handleGoogleSignin=async() =>{
     try {
      await loginWithGoogle()
      navigate('/')
     } catch (error) {
      setError(error.message)
     }
  }

  return (
  <div className='w-full max-w-xs m-auto'>
    <p className='sm:p-10'></p>
    <div className='pb-2 flex justify-center  sm:p-5'> 
     <img src={logo} alt="screenshot"/>
    </div>
   {error && <Alert message={error}/>}
   <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
      <label htmlFor="password" className='block text-gray-700'>Password</label>
      <input 
      type="password" 
      name="password" 
      id="password"
      placeholder="******"
      className='shadow appearance-none boder rounded w-full
      py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
      />
   </div>
   
   <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold
    text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline'>Ingresar</button>
  </form>
  <p className='text-black my-2 text-sm flex justify-between'>Registrar una cuenta!. <Link to= '/Register'>Registrar</Link></p>
   <button onClick={handleGoogleSignin} 
   className="bg-slate-50 hover:bg-slate-200 text-black
   shadow-md rounded border-2 border-gray-300 py-2 px-2 w-full flex justify-center"><img src={ImgGoogle} alt=""/> Login Google </button>
  </div>
  )
}

export default Login

