import React from 'react'

export const Room2 = ({ title, description, hotel, available, date, value }) => {
  return (
    <>
      <div className="card m-3 g-0" style={{ maxWidth: '20rem', maxHeight: '30rem' }}>
        <div className="card-body">

          <h5 className="card-title">Nombre :{title}</h5>
          <p className="card-text">Descripcion :{description}</p>
          <p className="card-text">Hotel: {hotel}</p>
          <p className="card-text">Estado :{available}</p>
          <p className="card-text">Disponibilidad :{date}</p>
          <p className="card-text">Precio :{value}</p>
        </div>
      </div>
    </>
  )
}