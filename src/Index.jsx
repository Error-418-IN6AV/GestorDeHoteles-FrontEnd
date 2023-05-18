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
import { ListEvent } from './pages/Event/ListEvent';
import { UpdateEvent } from './pages/Event/updateEvent';
import { EventPage } from './pages/Event/EventPage';
import { ManagerPage } from './pages/Manager/ManagerPage';
import { Reservation } from './pages/Reservation/Reservation';
import { ReservationPage } from './pages/Reservation/ReservationPage';
import { UpdatePageReserva } from './pages/Reservation/UpdatePageReserva';
import { Room } from './pages/Room/Room';
import { RoomsPage } from './pages/Room/RoomsPage';
import { Service } from './pages/Service/Service';
import { ServicePage } from './pages/Service/ServicePage';
import { HotelPage } from './pages/Hotel/HotelPage';
import { HotelsPage } from './pages/Hotel/HotelsPage';
import { UpdateRoom } from './pages/Room/UpdateRoom';
import { UpdateService } from './pages/Service/UpdateService';
import { HotelUpdate } from './pages/Hotel/HotelUpdate';
import { GetRooms } from './pages/Room/GetRooms';

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
              path: 'rooms2',
              element: <GetRooms></GetRooms>
            },
            {

              path: 'updateroom/:id',
              element: <UpdateRoom></UpdateRoom>

            },
            {
              path: 'updateService/:id',
              element: <UpdateService></UpdateService>
            },
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
                  element: <UpdateManager />
                }
              ]
            },
            {
              path: 'reservation',
              element: <Reservation></Reservation>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <ReservationPage></ReservationPage>
                },
                {
                  path: 'updatereservation/:id',
                  element: <UpdatePageReserva></UpdatePageReserva>
                }
              ]
            },
            {
              path: 'room',
              element: <Room></Room>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <RoomsPage></RoomsPage>
                },
              ]
            },
            {
              path: 'service',
              element: <Service></Service>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <ServicePage></ServicePage>
                },
              ]
            },
            {
              path: 'hotel',
              element: <HotelPage></HotelPage>,
              children: [
                {
                  path: '',
                  exact: true,
                  element: <HotelsPage></HotelsPage>
                },
                {
                  path: 'updatehotel/:id',
                  element: <HotelUpdate></HotelUpdate>
                }
              ]
            }
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

