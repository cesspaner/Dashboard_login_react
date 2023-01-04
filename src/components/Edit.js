import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import styled from 'styled-components'

   
const useStyles2 = makeStyles((theme) => ({
  modalstyle: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "2px",
    boxShadow: theme.shadows[3],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

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

const Edit = () => {
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);

  // Modales
  const [modal2, setModal2] = useState(true);
  const cerrarModal2 = () => {
    setModal2(false);
  };


  const navigate = useNavigate();
  const { id } = useParams();

  const update = async (e) => {
    e.preventDefault();
    const product = doc(db, "products", id);
    const data = { description: description, stock: stock };
    await updateDoc(product, data);
    Swal.fire({
      position: "absolute",
      icon: "success",
      title: "Sus cambios han sido editados correctamente",
      showConfirmButton: false,
      timer: 1000,
    });
    cerrarModal2(false);
    navigate("/");
  };

  const getProductById = async (id) => {
    const product = await getDoc(doc(db, "products", id));
    if (product.exists()) {
      setDescription(product.data().description);
      setStock(product.data().stock);
    } else {
      Swal.fire("El producto no existe");
      cerrarModal2(false);
      navigate("/");
    }
  };

  useEffect(() => {
    getProductById(id);
    // eslint-disable-next-line
  }, [modal2]);

  const styles2 = useStyles2();
  return (
     <Modal  open={modal2} onClose={setModal2} >
      <div className={styles2.modalstyle}>
        <div className="row">
          <div className="col">
            <h1>Edita un Producto</h1>
            <form onSubmit={update}>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  type="text"
                  className="form-control"
                  />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Stock</label>
                    <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    type="number"
                    className="form-control"
                    />
                 </div>
             <button type="submit" className="btn btn-primary">
                Update
             </button>
        </form>
      </div>
    </div>
        <BotonCerrar  onClick={cerrarModal2} ><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              </svg>
        </BotonCerrar>
  </div>
</Modal>
);
};

export default Edit;
