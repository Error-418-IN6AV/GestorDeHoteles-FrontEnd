import React, { useState, useEffect } from 'react'
import { CardRoom } from './CardRoom'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Box, Modal, Typography } from '@mui/material'

export const RoomPage = () => {
  const navigate = useNavigate();


  const [rooms, setRooms] = useState([{}])
  const [room, setRoom] = useState({});
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const logOut = (_id)=>{

    navigate(`/dashboard/updateRoom/${_id}`)

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
  const OpenUpdate = (id) => setOpenUpdate(true);
  const close = () => setOpen(false);

  const getRooms = async () => {
    try {
      const { data } = await axios('http://localhost:3000/room/get', { headers: headers })
      if (data.rooms) {
        setRooms(data.rooms)
        console.log(data.rooms)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting rooms')
    }
  }


  const deleteRoom = async (id) => {
    
    try {

      let confirmDelete = confirm('Are you sure to delete this Room ?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3000/room/delete/${id}`, { headers: headers })
        getRooms()
        alert(`${data.message}: ${data.deletedRoom.name}`)
      }
    } catch (err) {
      console.error(err)
    }
  }


  const add = async () => {
    try {

      let room = {
        name: document.getElementById('name').value,
        description: document.getElementById('description').value,
        date: document.getElementById('date').value,
        value: document.getElementById('value').value,

      }
      const { data } = await axios.post('http://localhost:3000/room/add', room, { headers: headers })
      alert(data.message)
      getRooms()
    } catch (err) {
      alert(err.response.data.message)
    }
  }
  const addIt = async () => {
    close();
    add();
  }



  useEffect(() => getRooms, [])
  return (

    <>

      <main>
        <center>
        <div className="left binding color">
         
         <h1> <i className="fa-solid fa-bed"> </i> | CONTROL ROOMS </h1> 
        </div>
        <div>

          <button onClick={Open} className="btn btn-success mb-2 btn-lg"><i className="fa-solid fa-door-closed"></i> ADD ROOM</button>

        </div>
        </center>
        <Modal
          open={open}
          onClose={close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={form}>
  
          <div  className="card-body p-4 p-sm-5">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Agregar Animal
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
                  <input type="text" name="date" className="form-control" id="date" placeholder="." />
                  <label htmlFor="floatingInput">date</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="text" name="value" className="form-control" id="value" placeholder="." />
                  <label htmlFor="floatingInput">value</label>
                </div>
                <div className="d-grid">
                  <button onClick={() =>addIt()} className="btn btn-primary btn-login text-uppercase fw-bold" type="submit"  >ADD</button>
                </div>


                <hr className="my-4" />
                <div className="d-grid mb-2">

                  <button onClick={close} className="btn btn-google btn-login text-uppercase fw-bold" type="submit">
                    <i className="fab  me-2"></i> CANCEL
                  </button>
                </div>
              </form>
            </Typography>
            </div>
          </Box>
        </Modal>
     
        <div className="row g-0 justify-content-center">
          {
            rooms.map(({ _id, name, description, hotel, available, date, value }, i) => {
              return (
                <CardRoom
                  key={i}

                  title={name}
                  description={description}
                  hotel={hotel}
                  available={available}
                  date={date}
                  value={value}
                  getRoom={() =>logOut(_id)}
                  deleteRoom={() => deleteRoom(_id)}


                ></CardRoom>
              )


            })

          }
        </div>

        
      </main>
    </>
  )
}
