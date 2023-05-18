import React from 'react'
import { Link } from 'react-router-dom'
import './HomeStyle.css'
import { Navbar } from '../components/Navbar'
import hotel from '../../src/assets/hotel.gif'

export const HomePage = () => {
  return (
    <>
      <img src={hotel} width={'100%'} className="img-fluid" alt="Sample image" />

      <div className="social-icons">
        <div className="d-flex flex-row flex-lg-column justify-content-center align-items-center h-100 mt-3 mt-lg-0">
          <Link to='/login'>
            <button className="btn btn-dark m-3" ><i className="fa-solid fa-right-to-bracket"></i></button>
          </Link>
          <Link to='/register'>
            <button className="btn btn-dark m-3"><i className="fa-solid fa-user-plus"></i></button>
          </Link>
        </div>
      </div>

    </>
  )
}
