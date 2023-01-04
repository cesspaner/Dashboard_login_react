import { createContext,useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword,signOut,GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { auth } from "../firebase";


export const authContext = createContext()

export const useAuth =()=> {
  const context = useContext(authContext)
  if (!context) throw new Error ('No se encuentra el provider')
  return context
}

export function AuthProvider ({children}){
    //inicializando seccion en null
    const [user, setUser]=useState(null);
    //loading para leer mientras carga
    const [loading, setLoading] = useState(true)

    //crear seccion
    const signup = (email,password)=>
        createUserWithEmailAndPassword(auth,email,password)

    //loguearse
    const login = (email, password) =>
        signInWithEmailAndPassword(auth, email,password)

    //cerrar seccion
    const logout =()=> signOut(auth)

    //login con google
    const loginWithGoogle =()=> {
     const googleProvider = new GoogleAuthProvider()
     return signInWithPopup (auth, googleProvider)
    }
        
    //validamos que el usuario este logueado
    useEffect(()=>{
      const unsubscribe= onAuthStateChanged(auth, currentUser=>{
        setUser (currentUser)
        //console.log(currentUser)
        setLoading(false)
      })
      return ()=> unsubscribe()
     },[])
     
    return (
        <authContext.Provider value={{signup, login, user,logout,loading,loginWithGoogle}}>
            {children}
        </authContext.Provider>
    )
}
