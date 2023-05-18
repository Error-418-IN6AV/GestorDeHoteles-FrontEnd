import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Index'
import { Outlet, Link } from 'react-router-dom'

export const DashboardPage = () => {
    const { setLoggedIn, dataUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.clear()
        setLoggedIn(false)
        navigate('/login')
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" >Relaxing Sites</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link active" aria-current="page" >Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='event' className="nav-link">Event</Link>
                            </li>
                            <li>
                                <Link to='rooms2' className="nav-link active" aria-current="page">
                                    View Rooms
                                </Link>
                            </li>
                            {dataUser.role == 'MANAGER' ? (
                                <li className="nav-item">
                                    <Link to='room' className="nav-link">Room</Link>
                                </li>
                            ) : <></>
                            }
                            {dataUser.role == 'MANAGER' ? (

                                <li className="nav-item">
                                    <Link to='service' className="nav-link">Service</Link>
                                </li>
                            ) : <></>
                            }
                            <li className="nav-item">
                                <Link to='hotel' className="nav-link">Hotels</Link>
                            </li>
                            {dataUser.role == 'ADMIN' ? (
                                <li className="nav-item">
                                    <Link to='manager' className="nav-link">User List</Link>
                                </li>
                            ) : <></>
                            }
                            {dataUser.role == 'MANAGER' ? (
                                <li className="nav-item">
                                    <Link to='reservation' className="nav-link">Reservation</Link>
                                </li>
                            ) : <></>
                            }
                            <li className="nav-item">
                                <span className='nav-link active'>Welcome: {dataUser.name}, {dataUser.username}</span>
                            </li>
                            <li className="nav-item">
                                <span className='nav-link active'>Role: {dataUser.role}</span>
                            </li>
                            <li className='nav-item'>
                                <Link onClick={logOut} className="nav-link active" aria-current="page">Sign off</Link >
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <section id='content'>
                <Outlet></Outlet>
            </section>
        </>
    )
}