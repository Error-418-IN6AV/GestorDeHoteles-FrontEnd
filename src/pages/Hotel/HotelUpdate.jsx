import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom';
import hotelUp from '../../assets/hotel.png'

export const HotelUpdate = () => {
    const [hotel, setHotel] = useState({});
    const { id } = useParams();

    const getHotel = async () => {
        try {
            const { data } = await axios(`http://localhost:3000/hotel/getHotel/${id}`)
            setHotel(data.hotel)
        } catch (err) {
            console.log(err)
        }
    }

    const updateHotel = async()=>{
        try {
            let updateHotel ={
                name: document.getElementById('inputName').value,
                description: document.getElementById('inputDescription').value,
                location: document.getElementById('inputLocation').value
            }
            const { data } = await axios.put(`http://localhost:3000/hotel/updateHotel/${id}`, updateHotel)
            console.log(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => { getHotel() }, [])

    return (
        <>
            <section className='vh-100'>
                <div className='container py-5 h-100'>
                    <div className='row d-flex justify-content-center align-items-center h-100'>
                        <div className='col-12 col-md-8 col-lg-6 col-xl-5'>
                            <div className='card shadow-2-strong'>
                                <div className='card-body p-5 text-center'>
                                    <form>
                                        <br />
                                        <div className='form-group text-center'>
                                            <img src={hotelUp} alheight="50" width="130" />
                                            <br /> <br />
                                            <h6>Update Hotel</h6>
                                        </div>
                                        <br />
                                        <div className='mb-3'>
                                            <label htmlFor="inputName" className='form-label'>Name</label>
                                            <input type="text" defaultValue={hotel.name} className='form-control' id="inputName" />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="inputDescription" className='form-label'>Description</label>
                                            <input type="text" defaultValue={hotel.description} className='form-control' id='inputDescription' />
                                        </div>
                                        <div className='mb-3'>
                                            <label htmlFor="inputlocation" className='form-label'>Location</label>
                                            <input type="text" defaultValue={hotel.location} className='form-control' id="inputLocation" />
                                        </div>

                                    </form>
                                    <br />
                                     <Link to="/hotels">
                                        <button onClick={() => updateHotel()} className="btn btn-success" style={{marginRight: '10px'}}>Update</button>
                                     </Link>
                                     <Link to="/hotels">
                                        <button className='btn btn-danger'>Cancel</button>
                                     </Link>
                                </div>
                            </div>

                        </div>
                    </div>

                </div>
            </section>

        </>
    )
}
