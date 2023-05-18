import React, { useState, useContext } from 'react'
import { Navbar } from '../../components/Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Index'
import Logo from '../../assets/Logo.png'

export const LoginPage = () => {
  const { loggedIn, setLoggedIn, setDataUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const logIn = async(e)=>{
    try{
      e.preventDefault()
      const { data } = await axios.post('http://localhost:3000/user/login', form)
      console.log(data.user)
      if(data.message){
        alert(data.message)
        localStorage.setItem('token', data.token)
        setDataUser(data.userLogged)
        setLoggedIn(true)
        navigate('/dashboard')
      }      
    }catch(err){
      console.log(err)
      alert(err.response?.data.message)
      throw new Error('Error in login')
    }
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderradius: '30px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Login</p>

                    <form className="mx-1 mx-md-4">

                      <div className="form-floating">
                        <input onChange={handleChange} type="username" name='username' className="form-control" placeholder='text' />
                        <label className="form-label" htmlFor="">Username</label>
                      </div>
                      <br />
                      <div className="form-floating">
                        <input onChange={handleChange} type="password" name='password' className="form-control" placeholder='text' />
                        <label className="form-label" htmlFor="">password</label>
                      </div>
                      <br />
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button onClick={logIn} type="button" className="btn btn-primary btn-lg">Login</button>
                      </div>

                    </form>

                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                    <img src={Logo} width={'80%'} className="img-fluid" alt="Sample image" />

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
