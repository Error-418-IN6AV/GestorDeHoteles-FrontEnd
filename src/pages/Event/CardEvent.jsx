import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";

export const CardEvent = ({ _id, nameevent, email, descriptionevent, date, price, type }) => {
  const [events, setEvents] = useState([{}])
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getEvent = async () => {
    try {
      const { data } = await axios('http://localhost:3000/event/get', { headers: headers })
      if (data.events) {
        setEvents(data.events)
        console.log(data.events)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting Event')
    }
  }

  const deleteEvent = async (id) => {
    try {
      let confirmDelete = confirm('Are you sure to delete this Event?')
      if (confirmDelete) {
        const { data } = await axios.delete(`http://localhost:3000/event/delete/${id}`, { headers: headers })
        alert(`${data.message}`)
        getEvent()
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => getEvent, [])


  return (
    <>
      <div className="card m-3 g-0" style={{ maxWidth: '18rem', maxHeight: '30rem' }}>
        <div className="card-body">
          <h5 className="card-title">Name Event:</h5>
          <p className="card-title">{nameevent}</p>
          <h5 className="card-title">Email:</h5>
          <p className="card-title">{email}</p>
          <h5 className="card-title">Description:</h5>
          <p className="card-title">{descriptionevent}</p>
          <h5 className="card-title">Date:</h5>
          <p className="card-title">{date}</p>
          <h5 className="card-title">Price:</h5>
          <p className="card-title">{price}</p>
          <h5 className="card-title">Event Type:</h5>
          <p className="card-title">{type}</p>
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <Link to={`updateEvent/${_id}`} type="button" className="btn btn-success">Update</Link>
            <a onClick={() => deleteEvent(_id)} type="button" className="btn btn-danger">Delete</a>
          </div>
        </div>
      </div>
    </>
  )
}