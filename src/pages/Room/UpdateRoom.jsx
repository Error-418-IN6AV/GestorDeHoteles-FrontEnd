import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const UpdateRoom = () => {
  const navigate = useNavigate();

  const [room, setRoom] = useState({});
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }


  const { id } = useParams();

  const logOut = () => {
    updateRoom()
    navigate('/dashboard/room')


  }


  const close = () => {

    navigate('/dashboard/room')


  }
  const getRooms = async () => {
    try {
      const { data } = await axios('http://localhost:3000/room/get', { headers: headers })
      if (data.rooms) {
        setRoom(data.rooms)
        console.log(data.rooms)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting room')
    }
  }


  const getRoom = async () => {
    try {
      const { data } = await axios(`http://localhost:3000/room/getRoom/${id}`, { headers: headers })
      setRoom(data.room)
    } catch (err) {
      console.error(err);
    }
  }

  const updateRoom = async () => {
    try {
      let updateRoom = {

        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        value: document.getElementById('value').value,
      }

      const { data } = await axios.put(`http://localhost:3000/room/update/${id}`, updateRoom, { headers: headers })
      console.log(data)
      getRooms()
    } catch (err) {
      console.error(err)
    }
  }


  useEffect(() => {

    getRoom();
  }, [])


  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
            <div className="card border-0 shadow rounded-3 my-5" id="carta">
              <div className="card-body p-4 p-sm-5">
                <h5 className="card-title text-center mb-5 fw-light fs-5">{room.name}</h5>

                <form>

                  <div className="form-floating mb-3">
                    <input defaultValue={room.description} type="text" name="description" className="form-control" id="description" placeholder="." />
                    <label htmlFor="floatingInput">description</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input defaultValue={room.date} type="text" name="date" className="form-control" id="date" placeholder="." />
                    <label htmlFor="floatingInput">date</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input defaultValue={room.value} type="text" name="value" className="form-control" id="value" placeholder="." />
                    <label htmlFor="floatingInput">value</label>
                  </div>
                  <div className="d-grid">
                    <button onClick={() => logOut()} className="btn btn-primary btn-login text-uppercase fw-bold" type="submit"  >UPDATE</button>
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
      <script src="https://kit.fontawesome.com/d40ea9438d.js" crossOrigin="anonymous"></script>
    </>
  )
}
