import React from 'react'

export const CardReservation = ({  date, room, service, user, deleteReserva, }) => {
  
  return (
    <>
    <div className="card m-3 g-0" style={{maxWidth: '18rem', maxHeight: '20rem'}}>
        <div className="card-body">
            <h4 className="card-title">Reservation</h4>
            <p className="card-text">
              <strong>Date:</strong> {date}
            </p>
            <p className="card-text">
              <strong>Room:</strong> {room}
            </p>
            <p className="card-text">
              <strong>Service:</strong> {service}
            </p>
            <p className="card-text">
              <strong>User:</strong> {user}
            </p>
            <button className="btn btn-danger" onClick={deleteReserva}>Cancel Reservation</button>
          </div>
    </div>
</>
  )
}
