import React, { useState, createContext, useEffect } from 'react'
import App from './App'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { NotFound } from './pages/NotFound';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ListEvent } from './pages/Event/ListEvent';
import { UpdateEvent } from './pages/Event/updateEvent';
import { EventPage } from './pages/Event/EventPage';

export const AuthContext = createContext();

export const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false)
  const [dataUser, setDataUser] = useState({
    name: '',
    username: '',
    role: ''
  })
  useEffect(() => {
    let token = localStorage.getItem('token')
    if (token) setLoggedIn(true)
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
              path: 'event',
              element: <EventPage></EventPage>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <ListEvent />
                },
                {
                  path: 'updateEvent/:id',
                  element: <UpdateEvent />
                }
              ]
            },
          ]
        }
      ]
    }
  ])
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, dataUser, setDataUser }}>
      <RouterProvider router={routes} />
    </AuthContext.Provider>
  )
}

