import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { db } from '../firebase'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Modal } from '@material-ui/core';
import Create from './Create';
import Edit from './Edit';

const MySwal = withReactContent(Swal)

const Show = () => {
    //0 - modales
    const [modal1 , setModal1]=useState(false)
    
    const abrirModal =()=>{
      setModal1(true)
    }
    
    //const cerrarModal =()=>{
    //  setModal(false)
    //}
    const [modal2 , setModal2]=useState(false)

    const abrirModal2 =()=>{
      setModal2(true)
    }
    const cerrarModal2 =()=>{
      setModal2(false)
    }
    //1 - configuramos los hooks
    const [products, setProducts] = useState( [] )
  
    //2 - referenciamos a la DB firestore
    const productsCollection = collection(db, "products")
  
    //3 - Funcion para mostrar TODOS los docs
    const getProducts = async ()   => {
     const data = await getDocs(productsCollection)
     //console.log(data.docs)
     setProducts(
         data.docs.map( (doc) => ( {...doc.data(),id:doc.id}))
     )
     //console.log(products)
    }
    //4 - Funcion para eliminar un doc
    const deleteProduct = async (id) => {
     const productDoc = doc(db, "products", id)
     await deleteDoc(productDoc)
     getProducts()
    }

    //5 funcion para confirmacion para sweet alert 2
    const confirmDelete = (id) => {
        MySwal.fire({
          title: '¿Desea eliminar el producto?',
          text: "Esta accion no es reversible una vez eliminado!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
          if (result.isConfirmed) { 
            //llamamos a la accion para eliminar   
            deleteProduct(id)               
            Swal.fire(
              'Deleted!',
              'El producto ha sido eliminado.',
              'success'
            )
          }
        })    
      }
   //6 - usamos useEffect
   useEffect( () => {
     getProducts()
     //eslint-disable-next-line 
    }, [] )
   //7 retorn
   return (
    <>
       <div>
        <div className='container'>
          <div className='row'>
            <div className='col'>
              <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                <button className="btn btn-outline-success mt-2 mb-2 btn-lg" type="submit">Search</button>
                <Link className='btn btn-primary mt-2 mb-2 btn-lg' onClick={abrirModal}>
                    <i>Crear</i> 
                </Link>
                <Modal open={modal1} onClose={setModal1}><Create /></Modal> 
              </div>
              <table className="table table-light table-hover">
                <thead>
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Accion</th>
                  </tr>
                </thead>
  
                <tbody>
                  {
                    products.map((product) => (
                      <tr key={product.id}>
                        <td>{product.description}</td>
                        <td>{product.stock}</td>
                        <td> 
                          <Link onClick={() => abrirModal2()}>
                            <i className="fa-solid fa-pencil"></i>
                          </Link>
                          <Modal open={modal2} onClose={cerrarModal2}>
                            <Edit path='/edit/:id' to={`${product.id}`} />
                          </Modal>
                          <button onClick={() => confirmDelete(product.id)} type="button" className="btn btn-danger">
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
   )
 }
  
  export default Show
  
