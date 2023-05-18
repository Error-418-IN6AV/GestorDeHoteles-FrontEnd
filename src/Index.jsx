import React, { useState, createContext, useEffect } from 'react'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/NotFound';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/Login/LoginPage';
import { RegisterPage } from './pages/Register/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ListUser } from './pages/Manager/ListUser';
import { UpdateManager } from './pages/Manager/UpdateManager';
import { ManagerPage } from './pages/Manager/ManagerPage'; 
export const AuthContext = createContext();

export const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [dataUser, setDataUser] = useState({
    name: '',
    username: '',
    role: ''
  })
  useEffect(()=> {
    let token = localStorage.getItem('token')
    if(token) setLoggedIn(true)
  }, [])

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          path: '/',
          element: <HomePage />
        },
        {
          path: '/register',
          element: <RegisterPage></RegisterPage>
        },
        {
          path: '/login',
          element: <LoginPage></LoginPage>
        },
        {
          path: '/dashboard',
          element: loggedIn ? <DashboardPage /> : <LoginPage />,
          children: [
            {
              path: 'manager',
              element: <ManagerPage></ManagerPage>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <ListUser></ListUser>
                },
                {
                  path: 'updatemanager/:id',
                  element: <UpdateManager/>
                }
              ]
            },
          ]
        }
      ]
    }
  ])
  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn, dataUser, setDataUser}}>
      <RouterProvider router={routes}/>
    </AuthContext.Provider>
  )
}

