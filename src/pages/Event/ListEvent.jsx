import React, { useState, useEffect, useContext } from 'react'
import { CardEvent } from './CardEvent'
import { AuthContext } from '../../Index'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListEvent = () => {
    const { dataUser } = useContext(AuthContext);
    const [types, setTypes] = useState([{}])
    const [event, setEvent] = useState([{}])
    const [form, setForm] = useState({
        name: '',
        description: ''
    })
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const addType = async () => {
        try {
            let types = {
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
            }
            const { data } = await axios.post('http://localhost:3000/type/add', types, { headers: headers })
            alert(data.message)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    const getType = async () => {
        try {
            const { data } = await axios('http://localhost:3000/type/get', { headers: headers })
            setTypes(data.types)
        } catch (err) {
            console.log(err);
        }
    }

    const getEvent = async () => {
        try {
            const { data } = await axios('http://localhost:3000/event/get', { headers: headers })
            setEvent(data.event)
        } catch (err) {
            console.log(err);
        }
    }

    const addEvent = async () => {
        try {
            let event = {
                nameevent: document.getElementById('inputNameEvent').value,
                email: document.getElementById('inputEmail').value,
                descriptionevent: document.getElementById('inputDescriptionEvent').value,
                date: document.getElementById('inputDate').value,
                price: document.getElementById('inputPrice').value,
                type: document.getElementById('inputType').value
            }
            const { data } = await axios.post('http://localhost:3000/event/add', event, { headers: headers })
            alert(data.message)
        } catch (err) {
            alert(err.response.data.message)
        }
    }

    useEffect(() => {
        getType();
        getEvent();
    }, [])

    return (
        <>
            <main>
                <div className="left binding color">
                    <h1 className='text-center'>Event List</h1>
                    <div className='text-center'>
                        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Event</button>
                    </div>
                    <br />
                    {
                        dataUser.role == 'ADMIN' ? (
                            <div className='text-center'>
                                <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2">Add Event Type</button>
                            </div>
                        ) : <></>
                    }
                </div>
                <div className="row g-0 justify-content-center">
                    {
                        event.map(({ _id, nameevent, email, descriptionevent, date, price, type }, i) => {
                            return (
                                <CardEvent
                                    _id={_id}
                                    key={i}
                                    nameevent={nameevent}
                                    email={email}
                                    descriptionevent={descriptionevent}
                                    date={date}
                                    price={price}
                                    type={type}
                                ></CardEvent>
                            )
                        })
                    }
                </div>
            </main>
            <div className="modal fade" id="exampleModal2" aria-labelledby="exampleModalLabel2" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className='text-center'>ADD TYPE EVENT</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="form-floating">
                            <input type="text" id="inputName" name='name' className="form-control" placeholder='text' />
                            <label className="form-label" htmlFor="inputName">Name Event Type</label>
                        </div>
                        <br />
                        <div className="form-floating">
                            <input type="text" id="inputDescription" name='name' className="form-control" placeholder='text' />
                            <label className="form-label" htmlFor="inputDescription">Description Event Type</label>
                        </div>
                        <br />
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">CLOSE</button>
                            <Link to='/dashboard/event'>
                                <button onClick={addType} type="button" className="btn btn-primary" data-bs-dismiss="modal">ADD EVENT TYPE</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className='text-center'>ADD EVENT</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="form-floating">
                            <input type="text" id="inputNameEvent" name='name' className="form-control" placeholder='text' />
                            <label className="form-label" htmlFor="inputNameEvent">Name Event</label>
                        </div>
                        <br />
                        <div className="form-floating">
                            <input type="text" id="inputEmail" name='email' className="form-control" placeholder='text' />
                            <label className="form-label" htmlFor="inputEmail">Email</label>
                        </div>
                        <br />
                        <div className="form-floating">
                            <input type="text" id="inputDescriptionEvent" name='description' className="form-control" placeholder='text' />
                            <label className="form-label" htmlFor="inputDescriptionEvent">Description</label>
                        </div>
                        <br />
                        <div className="form-floating">
                            <input type="text" id="inputDate" name='text' className="form-control" placeholder='text' />
                            <label className="form-label" htmlFor="inputDate">Date</label>
                        </div>
                        <br />
                        <div className="form-floating">
                            <input type="text" id="inputPrice" name='price' className="form-control" placeholder='number' />
                            <label className="form-label" htmlFor="inputPrice">Price</label>
                        </div>
                        <br />
                        <div className="mb-3">
                            <label htmlFor="inputType" className="form-label">Event Type</label>
                            <select className="form-control" id="inputType">
                                {
                                    types.map(({ _id, name }, i) => {
                                        return (
                                            <option key={i} value={_id}>{name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <br />
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">CLOSE</button>
                            <Link to='/dashboard/event'>
                                <button onClick={addEvent} type="button" className="btn btn-primary" data-bs-dismiss="modal">ADD EVENT</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}