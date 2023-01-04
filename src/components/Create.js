import React, { useState } from 'react'
//import { useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from "../firebase"
import Swal from 'sweetalert2'
import '../App.css'
import {makeStyles} from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import styled from 'styled-components'



const useStyles = makeStyles((theme)=>({
  modal:{
    position: 'absolute',
    width : 400,
    backgroundColor:'white',
    border: '2px ',
    boxShadow : theme.shadows[5],
    padding:theme.spacing(2,4,3),
    top: '50%',
    left: '50%',
    transform:'translate(-50%, -50%)',
  }
}))

const BotonCerrar = styled.button`
      position: absolute;
      top: 15px;
      right: 20px;
      
      width: 48 px;
      height:48 px;
      border: none;
      background: none;
      cursor: pointer;
      transition : .3s ease all;
      border-radius: 5px;
      color: #1766DC;

      &:hover{
        background :#f2f2f2;
      }
      svg{
        width: 100%;
        height: 100%;
      }
`;


const Create = () => {
  const [ description, setDescription ] = useState('')
  const [ stock, setStock ] = useState(0)
  //const navigate = useNavigate()
  //0 - modales
  const [modal, setModal] = useState(false);
  const cerrarModal = () => {
    setModal(true);
    console.log(modal)
  };
  
  const productsCollection = collection(db, "products")

  const store = async (e) => {
    e.preventDefault()
    await addDoc( productsCollection, { description: description, stock: stock } )
    Swal.fire({
        position:'absolute', //'top-end',
        icon: 'success',
        title: 'Sus cambios han sido guardados',
        showConfirmButton: false,
        timer: 1000
      })
      cerrarModal(false)
    //navigate('/')
    console.log(e.target[0].value)
  }
  const styles=useStyles();
  return (
    <>
    <Modal 
    open={!modal}
    onClose={setModal}
     >
    <div className={styles.modal}>
        <div className='row'>
            <div className='col'>
                <h1>Crea un producto</h1>
                 <form onSubmit={store}>
                    <div className='mb-3'>
                        <label className='form-label'>Descripcion</label>
                        <input
                            value={description}
                            onChange={ (e) => setDescription(e.target.value)} 
                            type="text"
                            className='form-control'
                        />
                    </div>  
                    <div className='mb-3'>
                        <label className='form-label'>Stock</label>
                        <input
                            value={stock}
                            onChange={ (e)=> setStock(e.target.value)} 
                            type="number"
                            className='form-control'
                        />                 
                    </div>  
                    <div>
                    <button type='submit' className='btn btn-primary'>Guardar</button>
                    </div>
                 </form>   
                 
            </div>
            <div >
              <BotonCerrar  onClick={() => cerrarModal()} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
              </BotonCerrar>
              
            </div>
        </div>
    </div>
  </Modal>
  </>
  )
}
  


export default Create

