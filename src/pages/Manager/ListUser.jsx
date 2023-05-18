import React, { useState, useEffect } from 'react'
import { CardManager } from './CardManager'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const ListUser = () => {
  const [users, setUsers] = useState([{}])
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token')
  }

  const getUsers = async () => {
    try {
      const { data } = await axios('http://localhost:3000/user/get', { headers: headers })
      if (data.users) {
        setUsers(data.users)
        console.log(data.users)
      }
    } catch (err) {
      console.log(err);
      throw new Error(err.response.message || 'Error getting User')
    }
  }

  const addManager = async () => {
    try {
      let manager = {
        name: document.getElementById('inputName').value,
        surname: document.getElementById('inputSurname').value,
        email: document.getElementById('inputEmail').value,
        username: document.getElementById('inputUsername').value,
        password: document.getElementById('inputPassword').value
      }
      const { data } = await axios.post('http://localhost:3000/user/save', manager, { headers: headers })
      alert(data.message)
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  useEffect(() => getUsers, [])

  return (
    <>
      <main>
        <div className="left binding color">
          <h1 className='text-center'>User List</h1>
          <div className='text-center'>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Manager</button>
          </div>
        </div>
        <div className="row g-0 justify-content-center">
          {
            users.map(({ _id, name, username, email, surname, password, role }, i) => {
              return (
                <CardManager
                  _id={_id}
                  key={i}
                  name={name}
                  username={username}
                  email={email}
                  surname={surname}
                  password={password}
                  role={role}
                ></CardManager>
              )
            })
          }
        </div>
      </main>
      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className='text-center'>ADD MANAGER</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="form-floating">
              <input type="text" id="inputName" name='text' className="form-control" placeholder='text' />
              <label className="form-label" htmlFor="inputName">Name</label>
            </div>
            <br />
            <div className="form-floating">
              <input type="text" id="inputSurname" name='text' className="form-control" placeholder='text' />
              <label className="form-label" htmlFor="inputSurname">Surname</label>
            </div>
            <br />
            <div className="form-floating">
              <input type="text" id="inputEmail" name='text' className="form-control" placeholder='text' />
              <label className="form-label" htmlFor="inputEmail">Email</label>
            </div>
            <br />
            <div className="form-floating">
              <input type="text" id="inputUsername" name='date' className="form-control" placeholder='text' />
              <label className="form-label" htmlFor="inputUsername">Username</label>
            </div>
            <br />
            <div className="form-floating">
              <input type="Password" id="inputPassword" name='number' className="form-control" placeholder='Number' />
              <label className="form-label" htmlFor="inputPassword">Password</label>
            </div>
            <br />
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">CLOSE</button>
              <Link to='/dashboard/manager'>
                <button onClick={addManager} type="button" className="btn btn-primary" data-bs-dismiss="modal">ADD EVENT</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}