import React, { useState, useEffect } from 'react'
import { CardService } from './CardService'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Box, Modal, Typography } from '@mui/material'
import { UpdateService } from './UpdateService'


export const ServicePage = () => {
    const navigate = useNavigate();

  const [services, setService] = useState([{}])
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const updateService = (_id)=>{

    navigate(`/dashboard/updateService/${_id}`)

}

  const form = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
 
  };


  const [open, setOpen] = useState(false);
  const Open = () => setOpen(true);
  const close = () => setOpen(false);


  const getServices = async()=>{
    try{
      const { data } = await axios('http://localhost:3000/service/get', {headers: headers})
      if(data.services){
        setService(data.services)
        console.log(data.services)
      }
    }catch(err){
      console.log(err);
      throw new Error(err.response.message ||'Error getting Services')
    }
  }

  const deletedService = async(id)=>{
    try{
        let confirmDelete = confirm('Are you sure to delete this Service ?')
        if(confirmDelete){
            const { data } = await axios.delete(`http://localhost:3000/service/delete/${id}`,{headers: headers})
            getServices()
            alert(`${data.message}: ${data.deletedService.name}`)
        }
    }catch(err){
        console.error(err)
    }
}

const add = async()=>{
  try{
  
      let service = {
          name: document.getElementById('name').value,
          description: document.getElementById('description').value,
          price: document.getElementById('price').value,


      }
      const { data } = await axios.post('http://localhost:3000/service/add',service,{headers: headers})
      alert(data.message)
      getServices()
  }catch(err){
    alert(err.response.data.message)
  }
}

const addIt = async () => {
  close();
  add();
}



  useEffect(()=> getServices, [])
  return (

    <>

          <center>
        <div className="center binding color">
   
         <h1><i className="fa-solid fa-bell-concierge"></i> | CONTROL SERVICES </h1> 
        </div>
        <button onClick={Open} className="btn btn-success mb-5 btn-lg"><i className="fa-solid fa-utensils"></i> ADD SERVICE</button>
          </center>

      <main>

        <div>
        
        
             <Modal
          open={open}
          onClose={close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={form}>
  
          <div  className="card-body p-4 p-sm-5">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Agregar Servicio
            </Typography>
            <Typography component={'div'} id="modal-modal-description" sx={{ mt: 2 }} >
              <form>
                <div className="form-floating mb-3">
                  <input type="text" name="name" className="form-control" id="name" placeholder="." />
                  <label htmlFor="floatingInput">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" name="description" className="form-control" id="description" placeholder="." />
                  <label htmlFor="floatingInput">description</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" name="price" className="form-control" id="price" placeholder="." />
                  <label htmlFor="floatingInput">Price</label>
                </div>
                <div className="d-grid">
                  <button onClick={() =>addIt()} className="btn btn-primary btn-login text-uppercase fw-bold" type="submit"  >ADD</button>
                </div>


                <hr className="my-4" />
                <div className="d-grid mb-2">

                  <button onClick={close} className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                    <i className="fab  me-2"></i>CANCEL
                  </button>
                </div>
              </form>
            </Typography>
            </div>
          </Box>
        </Modal>
         </div>


        <div className="row g-0 justify-content-center">
          {
            services.map(({_id,name,description, price}, i)=>{
              return (
                <CardService
                  key={i}
                  
                  title={name}
                  description={description}
                  price={price}
                  uService = {()=>updateService(_id)}
                  deleteService = {()=> deletedService(_id)}
                  
                ></CardService>
              )


            })
            
          }
        </div>
      </main>
    </>
  )
}
