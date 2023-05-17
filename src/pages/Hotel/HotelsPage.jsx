import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CardHotel } from '../../components/CardHotel'
import { Box, Modal, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'


export const HotelsPage = () => {
    const [hotels, setHotels, searchResult] = useState([{}])
    const [users, setUser] = useState([])
    const [idHotel, setIdHotel] = useState();

    const form = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
    }

    const [open, setOpen,] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false)

    const Open = () => setOpen(true);
    const close = () => setOpen(false)


    const addHotel = async () => {
        try {
            let hotel = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                location: document.getElementById('inputLocation').value,
                adminHotel: document.getElementById('inputAdminHotel').value
            }
            const { data } = await axios.post('http://localhost:3000/hotel/add', hotel)
            getHotels()
            console.log(data)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const getAdminHotel = async () => {
        try {
            const { data } = await axios('http://localhost:3000/user/getManager')
            if (data.users) {
                console.log(data)
                setUser(data.users)
            }
        } catch (err) {
            console.log(err)
        }
    }



    const getHotels = async () => {
        try {
            const { data } = await axios('http://localhost:3000/hotel/getHotels')
            if (data.hotels) {
                setHotels(data.hotels)
                console.log(data.hotels)
            }

        } catch (err) {
            console.log(err)
            throw new Error(err.response.message || 'Error getting Hotels')
        }
    }




    const deleteHotel = async (_id) => {
        try {
            let confirmDelete = confirm('Are you sure to delete this Hotel')
            if (confirmDelete) {
                const { data } = await axios.delete(`http://localhost:3000/hotel/deleteHotel/${_id}`)
                getHotels()
                alert(`${data.message}`)
            }

        } catch (err) {
            console.error(err)
        }
    }

    const search = async () => {
        try {
            let getSearch = {
                search: document.getElementById('inputSearch').value
            }
            const { data } = await axios.post('http://localhost:3000/hotel/search', getSearch)
            setHotels(data.searchResult)
        } catch (err) {
            console.log(err)
        }
    }







    useEffect(() => { getAdminHotel(); getHotels(); }, []);
    return (
        <>
            <main>
                <div className='left black color'>
                    <i className='bi bi-building-fill'></i>
                    <h1>Hotels</h1>

                </div>
                <div>
                    <button className='btn btn-success mb-5' onClick={Open}>
                        Add Hotel
                    </button>
                </div>
                <Modal
                    open={open}
                    onClose={close}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={form}>
                        <div className='card-body p-4 p-sm-5'>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Add Hotel
                            </Typography>
                            <Typography component={'div'} id="modal-modal-description" sx={{ met: 2 }}>
                                <form>
                                    <div className='mb-3'>
                                        <label htmlFor="inputName" className='form-label'>Name</label>
                                        <input type="text" className='form-control' id='inputName' />
                                    </div>
                                    <div>
                                        <label htmlFor="inputDescription" className='form-label'>Description</label>
                                        <input type="text" className='form-control' id='inputDescription' />
                                    </div>
                                    <div>
                                        <label htmlFor="inputLocation" className='form-label'>Location</label>
                                        <input type="text" className='form-control' id='inputLocation' />
                                    </div>
                                    <div>
                                        <label htmlFor="inputAdminHotel" className='form-label'>Admin Hotel</label>
                                        <select className='form-control' id="inputAdminHotel">
                                            {
                                                users.map(({ _id, name }, e) => {
                                                    return (
                                                        <option key={e} value={_id}>{name}</option>
                                                    )
                                                })
                                            }
                                        </select>

                                    </div>
                                </form>
                                <br />
                                <button className='btn btn-success' onClick={(e) => { addHotel(); close() }}>Add</button>
                                <br />
                                <br />
                                <button className='btn btn-danger' onClick={close}>Cancel</button>
                            </Typography>
                        </div>
                    </Box>

                </Modal>

                <div className='input-group mb-3'>
                    <input type="text" id="inputSearch" className='form-control' placeholder='Search Hotel' aria-label="Recipient's username" aria-describedby="button-addon2"/>
                    <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={search} >Search</button>                           
                </div>
                <table className='table table-dark table-hover' >
                    <thead>
                        <tr className='text-center'>
                            <th>Name</th>
                            <th>Description</th>
                            <th>location</th>
                            <th>Admin Hotel</th>
                            <th>Accions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            hotels.map(({ _id, name, description, location, adminHotel }, i) => {
                                const updateHotel = async () => {
                                    try {
                                        let upHotel = {
                                            name: document.getElementById('inputNameUp').value,
                                            description: document.getElementById('inputDescriptionUp').value,
                                            location: document.getElementById('inputLocation').value,
                                        }
                                        const { data } = await axios.put(`http://localhost:3000/hotel/updateHotel/${idHotel}`, upHotel)
                                        alerte('Update Sucessfully')
                                        getHotels()
                                        clear()
                                        viewUpdate()
                                    } catch (err) {
                                        console.log(err)
                                    }
                                }

                                const clear = async () => {
                                    try {
                                        document.getElementById('inputNameUp').value = '',
                                            document.getElementById('inputDescriptionUp').value = '';
                                        document.getElementById('inputLocationUp').value = '';
                                    } catch (err) {
                                        console.log(err)
                                    }
                                }

                                const viewUpdate = async (idHotel) => {
                                    try {
                                        setIdHotel(idHotel)
                                        document.getElementById('inputNameUp').defaultValue = name,
                                            document.getElementById('inputDescriptionUp').defaultValue = description,
                                            document.getElementById('inputLocationUp').defaultValue = location

                                    } catch (err) {
                                        console.log(err)
                                    }
                                }


                                return (
                                    <tr key={i}>
                                        <CardHotel
                                            name={name}
                                            description={description}
                                            location={location}
                                            adminHotel={adminHotel?.name}

                                        ></CardHotel>
                                        <td>
                                            <Link to={`update/${_id}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                                </svg>
                                            </Link>

                                        </td>
                                        <td>
                                            <svg onClick={() => deleteHotel(_id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                            </svg>
                                        </td>
                                    </tr>

                                )
                            })

                        }
                    </tbody>

                </table>

            </main>
        </>
    )
}
