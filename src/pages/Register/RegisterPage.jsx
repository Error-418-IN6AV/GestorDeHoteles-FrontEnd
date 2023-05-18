import { Navbar } from '../../components/Navbar'
import './RegisterPage.css'
import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

export const RegisterPage = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    surname: '',
    username: '',
    password: '',
    email: ''
    })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const register = async(e)=>{
    try{
        e.preventDefault()
        const { data } = await axios.post('http://localhost:3000/user/register', form)
        if(data.message){
            alert(data.message)
            navigate('/login')
        }
    }catch(err){
        console.log(err)
        alert(err.response.data.message)
        throw new Error('Error registering user')
    }
}

  return (
    <>
      <Navbar></Navbar>
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '15px' }}>
                <div className="card-body p-5">
                  <h3 className='text-uppercase text-center mb-5'>Register</h3>
                  <form>

                    <div className="form-floating">
                      <input onChange={handleChange} type="text" name='name' className="form-control" placeholder='text' />
                      <label className="form-label" htmlFor="">Name</label>
                    </div>
                    <br />
                    <div className="form-floating">
                      <input onChange={handleChange} type="text" name='surname' className="form-control" placeholder='text' />
                      <label className="form-label" htmlFor="">Surname</label>
                    </div>
                    <br />
                    <div className="form-floating">
                      <input onChange={handleChange} type="text" name='username' className="form-control" placeholder='text' />
                      <label className="form-label" htmlFor="">Username</label>
                    </div>
                    <br />
                    <div className="form-floating">
                      <input onChange={handleChange} type="password" name='password' className="form-control" placeholder='password' />
                      <label className="form-label" htmlFor="">Password</label>
                    </div>
                    <br />
                    <div className="form-floating">
                      <input onChange={handleChange} type="text" name='email' className="form-control" placeholder='text' />
                      <label className="form-label" htmlFor="">Email</label>
                    </div>
                    <br />
                    <div className="d-flex justify-content-center">
                      <button onClick={register} type="button" className="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">Have already an account?
                      <Link to='/login' className="fw-bold text-body">Login here</Link></p>

                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
