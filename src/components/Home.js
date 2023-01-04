import { Tab, Card, TabList, Text, Title} from '@tremor/react'
import React, { useState } from 'react'
import CardGridMap from './CardGridMap'
import ChartDonut from './ChartDonut'
import RegistrosE from './RegistrosE'
import {HomeModernIcon} from '@heroicons/react/24/solid'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authContext'
import logo from '../assets/logo192.png'




const Home = () => {
    const [selectedView, setSelectedView] = useState(1)
    /*logaut */
    const {user,logout, loading}=useAuth()
    const navigate = useNavigate()
    console.log(user)
  //asincrono por eso uso await : promise y tomara su tiempo en validacion
    const handleLogout=async()=>{
        try {
          await logout()
        } catch (error) {
          console.log(error);
      }
      navigate ("/Login")
    }
    if (loading) return <h1>Loading...</h1>

  return (
    <main className='bg-slate-200 py-6 sm:p-10 '>
      <div className="d-grid gap-1">
      <div>
        <h1 className='my-2 text-sm flex justify-between'><img src={logo} alt="screenshot"/>
           <div >{/*className='bg-white rounded shadow-md px-4  pt-4 pb-4 mb-4' */}
             <h1 className="text-sm text-black"> Hola!,  {user.displayName || user.email}</h1> {/*className="text-xl mb-2" */}
             <button onClick={handleLogout} className="bg-slate-50 hover:bg-slate-200 rounded py-1 px-2 text-black">Logout</button>
           </div> 
        </h1>
      </div>
        <Title>Dashboard</Title>
        <Text> Dashboard para mostrar los recursos con React</Text>
      </div>
        <TabList defaultValue={selectedView} handleSelect={ value => setSelectedView(value)} marginTop="mt-6">
            <Tab value={1} text="Principal" icon={HomeModernIcon} />
            <Tab value={2} text="Detalles" />
            <Tab value={3} text="Inventario" />
            <Tab value={4} text="Acerca De" />
        </TabList>

                 { selectedView === 1 ? (
                    <>
                      <ChartDonut/>
                      <CardGridMap/>
                    </>
                  ) : selectedView === 2 ? (
                    <>
                      <RegistrosE/>
                    </>
                  ) : selectedView === 3 ? (
                    <>
                      <Card>
                        <div className='h-28 bg-emerald-300'/>
                      </Card>
                      <Card>
                        <div className='h-28 bg-blue-300'/>
                      </Card>
                    </> 
                  ) 
                  : selectedView === 4 ? (
                    <>
                      <Card>
                        <div className='h-28 bg-white-300'>
                        <Text className= "text-black">My name is fausto palacios, opciones aun no disponibles, pendiente de conectar al back-kend</Text>
                        </div>
                      </Card>
                    </> 
                  ): null }

    </main>
  )
}

export default Home