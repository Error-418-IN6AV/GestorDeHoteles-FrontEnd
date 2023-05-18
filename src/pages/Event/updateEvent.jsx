import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';

export const UpdateEvent = () => {
    const [event, setEvent] = useState([{}])
    const [types, setType] = useState([{}])
    const [loading, setLoading] = useState(true)
    const { id } = useParams();
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
    }

    const getEvent = async () => {
        try {
            const { data } = await axios(`http://localhost:3000/event/get/${id}`, { headers: headers })
            setEvent(data.event)
            setLoading(false)
        } catch (err) {
            console.error(err);
        }
    }

    const getType = async () => {
        try {
            const { data } = await axios('http://localhost:3000/type/get', { headers: headers })
            setType(data.types)
        } catch (err) {
            console.log(err);
        }
    }

    const updateEvent = async () => {
        try {
            let updateEvent = {
                nameevent: document.getElementById('inputNameEvent').value,
                email: document.getElementById('inputEmail').value,
                descriptionevent: document.getElementById('inputDescriptionEvent').value,
                date: document.getElementById('inputDate').value,
                price: document.getElementById('inputPrice').value,
                type: document.getElementById('inputType').value
            }
            const { data } = await axios.put(`http://localhost:3000/event/update/${id}`, updateEvent, { headers: headers })
            console.log(data)
            getEvent()
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        getType();
        getEvent();
    }, [])

    return (
        <>
            <h1 className='text-center'>UPDATE EVENT</h1>
            <div className='col-md-4 offset-md-4 mb-5 bt-5'>
                <div className='tab-content'>
                    <div className="tab-pane fade show active" id="pills-update" role="tabpanel" aria-labelledby="tab-update">
                        <form>
                            <br />
                            <div className='form-group text-center'>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={event.nameevent} type="text" id="inputNameEvent" name='nameevent' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputNameEvent">Name Event</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={event.email} type="text" id="inputEmail" name='email' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputEmail">Email</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={event.descriptionevent} type="text" id="inputDescriptionEvent" name='descriptionevent' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputDescriptionEvent">Description</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={event.date} type="text" id="inputDate" name='text' className="form-control" placeholder='text' />
                                <label className="form-label" htmlFor="inputDate">Date</label>
                            </div>
                            <br />
                            <div className="form-floating">
                                <input defaultValue={event.price} type="number" id="inputPrice" name='Price' className="form-control" placeholder='text' />
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
                            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                <Link to="/dashboard/event">
                                    <button onClick={() => updateEvent()} className="btn btn-success">UPDATE</button>
                                </Link>
                                <Link to="/dashboard/event">
                                    <button className="btn btn-danger">Cancel</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}