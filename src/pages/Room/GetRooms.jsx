import React, { useState, useEffect } from 'react'
import { Room2 } from './Room2'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const GetRooms = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([{}])
  const [room, setRoom] = useState({});
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getRooms = async () => {
    try {
      const { data } = await axios('http://localhost:3000/room/getRooms',{ headers: headers })
      if (data.rooms) {
        setRooms(data.rooms)
        console.log(data.rooms)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting rooms')
    }
  }

  useEffect(() => getRooms, [])
  return (

    <>
      <main>
        <center>
        <div className="left binding color">
         <h1> <i className="fa-solid fa-bed"> </i> |  ROOMS </h1> 
        </div>
        </center>
        <div className="row g-0 justify-content-center">
          {
            rooms.map(({ _id, name, description, hotel, available, date, value }, i) => {
              return (
                <Room2
                  key={i}
                  title={name}
                  description={description}
                  hotel={hotel}
                  available={available}
                  date={date}
                  value={value}
                ></Room2>
              )


            })

          }
        </div>

        
      </main>
    </>
  )
}