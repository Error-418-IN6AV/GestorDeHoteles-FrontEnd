import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export const UpdatePageReserva = () => {
    const [reserva, setReserva]= useState({});
    const [rooms, setRooms] = useState([])
    const [services, setServices] = useState([])
    const {id} = useParams();

    const getReserva = async () => {
        try {
            const { data } = await axios(`http://localhost:3000/reserva/getId/${id}`)
            setReserva(data.reserva)
        } catch (err) {
            console.log(err)
        }
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
            setServices(data.services)
        }catch(err){
            console.log(err);
        }
    }

    const updateReserva = async ()=>{
        try {
            let updatedReservation = {
                date: document.getElementById('inputDate').value,
                room: document.getElementById('inputRoom').value,
                service: document.getElementById('inputService').value,
            }
            const  { data } = await axios.put(`http://localhost:3000/reserva/update/${id}`, updatedReservation )
            console.log(data)
            getHotels()
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(()=> {getRooms, getServicios(), getReserva()}, [])
  return (
    <>
    <h1>Update Reservation</h1>
    <form className="m-5 text-center">
        <div className="mb-3">
            <label htmlFor="inputDate" className="form-label">Date</label>
            <input type="text" defaultValue={reserva.date} className='form-control' id="inputName" />
        </div>
        <div className="mb-3">
            <label htmlFor="inputRoom" className="form-label">Room</label>
            <select defaultValue={reserva.room?._id} className="form-control" id="inputRoom">
                {
                    rooms.map(({_id, name}, i)=>{
                        return(
                            <option key={i} value={_id}>{name}</option>
                        )
                    })
                }
            </select>
        </div>
        <div className="mb-3">
            <label htmlFor="inputService" className="form-label">Servicios</label>
            <select defaultValue={reserva.service?._id}  className="form-control" id="inputService">
                {
                    services.map(({_id, name}, i)=>{
                        return(
                            <option key={i} value={_id}>{name}</option>
                        )
                    })
                }
            </select>
        </div>
        <Link to="/reserva">
            <button onClick={()=>updateReserva()} className="btn btn-success">UPDATE</button>
        </Link>
        <Link to="/reserva">
            <button className="btn btn-danger">Cancel</button>
        </Link>
    </form>
    </>
  )
}
