import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { CardReservation } from './CardReservation'

export const ReservationPage = () => {
    const [reservations, setReservations] = useState([{}])
    const [services, setServicios] = useState([{}])
    const [rooms, setRooms] = useState([{}])
    const [users, setUsers] = useState([{}])
    //const [idReserva, setIdReserva] = useState();
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
    }

  const getRooms = async()=>{
      try{
          const { data } = await axios('http://localhost:3000/room/get')
          setRooms(data.rooms)
      }catch(err){
          console.log(err);
      }
  }

  const getServicios = async()=>{
      try{
          const { data } = await axios('http://localhost:3000/service/get')
          setServicios(data.services)
      }catch(err){
          console.log(err);
      }
  }

  const getUses = async()=>{
    try{
        const { data } = await axios('http://localhost:3000/user/gets')
        setUsers(data.users)
    }catch(err){
        console.log(err);
    }
}

    const getReservations = async()=>{
        try{
          const { data } = await axios('http://localhost:3000/reserva/get')
          if(data.reservations){
            setReservations(data.reservations)
            console.log(data.reservations)
          }
        }catch(err){
          console.log(err);
          throw new Error(err.response.message ||'Error getting reservations')
        }
      }

      const addReservation = async () => {
        try {
            let reservation = {
                date: document.getElementById('inputDate').value,
                room: document.getElementById('inputRoom').value,
                service: document.getElementById('inputService').value
            }
            const { data } = await axios.post('http://localhost:3000/reserva/add', reservation, {headers: headers})
            alert(data.message)
            getReservations()
        } catch (err) {
            alert(err.response.data.message)
        }
      }

      const deletedReserva= async(_id) => {
        try{
          let confirmDelete = confirm('Are you sure to delete this reservation?')
            if(confirmDelete){
                const { data } = await axios.delete(`http://localhost:3000/reserva/delete/${_id}`,  {headers: headers})
                getReservations()
                alert(`${data.message}: ${data.deletedReservation}`)
            }
        }catch(err){
          console.error(err)
        }
      }
    
      useEffect(()=> {getReservations(), getUses(); getRooms(), getServicios()}, [])
  return (
    <>
    <main>
      <div className="left binding color">
        <i className="fa-solid fa-shield-dog"></i>
        | CONTROL RESERVATIONS
      </div>
      <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModal1">
                    Add Reseva
        </button>
      <div className="modal fade" id="exampleModal1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add Reservation</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form id="formAdd">
                                    <div className="mb-3">
                                        <label htmlFor="inputName" className="form-label">Date</label>
                                        <input type="text" className="form-control" id="inputDate" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputDescription" className="form-label">Room</label>
                                        <select className="form-control" id="inputRoom">
                                            {
                                              rooms &&rooms.map(({_id, name}, i)=>{
                                                return(
                                                  <option key={i} value={_id}>{name}</option>
                                                )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputLocation" className="form-label">Services</label>
                                        <select className="form-control" id="inputService">
                                            {
                                              services &&services.map(({_id, name}, i)=>{
                                                return(
                                                  <option key={i} value={_id}>{name}</option>
                                                )
                                                })
                                            }
                                        </select>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                <button onClick={addReservation}  type="button" className="btn btn-success" data-bs-dismiss="modal">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
                <br /><br />
       <div className="row g-0 justify-content-center">
       {
          reservations.map(({_id ,date, room, service, user}, i)=>{

            return (
              <div className='flex-grow-0 mx-2' key={i}>
              <CardReservation
                date={date}
                room={room?.name}
                service={service?.name}
                user={user}
                deleteReserva={()=> deletedReserva(_id)}
                ></CardReservation>
              </div>
            )
          })
        }
      </div> 
    </main>
  </>
  )
}
