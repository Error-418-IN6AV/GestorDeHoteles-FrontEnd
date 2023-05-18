import React from "react";
import axios from "axios";
import { useEffect, useState } from "react"; 
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const UpdateService = () => {
  const navigate = useNavigate();

    const [service, setService] = useState({});
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }
  

    const { id } = useParams();

    const updateService = ()=>{
      update()
      navigate('/dashboard/services')
   
  
  }



  
  const close = ()=>{

    navigate('/dashboard/services')
 

}

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
  

    const getService = async()=>{
        try{
          const { data } = await axios(`http://localhost:3000/service/getService/${id}`,{ headers: headers })
          setService(data.service)
        }catch(err){
        
        }
      }

      const update = async()=>{
        try{
          let update = {

            description: document.getElementById('description').value,
            price: document.getElementById('price').value,
          }
    
          const { data } = await axios.put(`http://localhost:3000/service/update/${id}`,update,{ headers: headers })
          console.log(data)
          getServices()
        }catch(err){
          alert(err.response.data.message)
        }
      }
    

      useEffect(() => {

        getService();
      }, [])


  return (
    <>
    <div  className="container">
    <div  className="row">
      <div  className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div  className="card border-0 shadow rounded-3 my-5" id="carta">
          <div  className="card-body p-4 p-sm-5">
            <h5  className="card-title text-center mb-5 fw-light fs-5">{service.name}</h5>
            
            <form>
                <div className="form-floating mb-3">
                  <input defaultValue={service.description}  type="text" name="description" className="form-control" id="description" placeholder="." />
                  <label htmlFor="floatingInput">description</label>
                </div>
                <div className="form-floating mb-3">
                  <input defaultValue={service.price}  type="text" name="price" className="form-control" id="price" placeholder="." />
                  <label htmlFor="floatingInput">Price</label>
                </div>
                <div className="d-grid">
                  <button onClick={() =>updateService()} className="btn btn-primary btn-login text-uppercase fw-bold" type="submit"  >UPDATE</button>
                </div>


                <hr className="my-4" />
                <div className="d-grid mb-2">

                  <button onClick={close} className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                    <i className="fab  me-2"></i>CANCEL
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  </div> 

   </>
  )
}
