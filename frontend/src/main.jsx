import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter ,RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Rent from './pages/Rent.jsx'
import HomePage from './Components/HomePage.jsx'
import CarType from './Components/CarList/CarType.jsx'
import CarType2 from './Components/CarList/CarType2.jsx'
import CarType3 from './Components/CarList/CarType3.jsx'
import CarType5 from './Components/CarList/CarType5.jsx'
import Login from './pages/User_Management/Login.jsx'
import SignUp from './pages/User_Management/SignUp.jsx'
import AdminLogin from './pages/User_Management/AdminLogin.jsx'
import AdminSignUp from './pages/User_Management/AdminSignUp.jsx'
import StaffLogin from './pages/User_Management/StaffLogin.jsx'
import AdminDashboard from './pages/User_Management/AdminDahboard.jsx'
import AdminDashboards from './Components/dashboards/AdminDashboard.jsx'
import ManageStaff from './Components/Admin_Dashboard/ManageStaff.jsx'
import ManageUser from './Components/Admin_Dashboard/ManageUser.jsx'
import AddUser from './Components/Admin_Dashboard/AddUser.jsx'
import UpdateUser from './Components/Admin_Dashboard/UpdateUser.jsx'
import AddStaff from './Components/Admin_Dashboard/AddStaff.jsx'
import UpdateStaff from './Components/Admin_Dashboard/UpdateStaff.jsx'
import StaffDashboard from './pages/Vehicle_Management/StaffDahboard.jsx'
import StaffDashboards from './Components/Staff_Dashboard/StaffDashboard.jsx'
import ManageVehicle from './Components/Staff_Dashboard/ManageVehicle.jsx'
import AddVehicle from './Components/Staff_Dashboard/AddVehicle.jsx'
import UpdateVehicle from './Components/Staff_Dashboard/UpdateVehicle.jsx'
import RentCar from './pages/RentCar.jsx'
import DelManLogin from './pages/User_Management/DelManLogin.jsx'
import DelManDashboard from './pages/Delivery_Management/DelManDashboard.jsx'
import DelDashboard from './Components/Delivery_Dashboard/DelDashboard.jsx'
import ManageDel from './Components/Delivery_Dashboard/ManageDel.jsx'
import UpdateDelivery from './Components/Delivery_Dashboard/UpdateDel.jsx'
import ManageDelPerson from './Components/Admin_Dashboard/ManageDelPerson.jsx'
import AddDelPerson from './Components/Admin_Dashboard/AddDelPerson.jsx'
import DelPersons from './Components/Delivery_Dashboard/DelPersons.jsx'
import TrackDels from './Components/Delivery_Dashboard/TrackDeliveries.jsx'
import DelPerLogin from './pages/User_Management/DelPersonLogin.jsx'
import DelPerDashboard from './pages/Delivery_Management/DelPerDashboard.jsx'
import DelPerDash from './Components/DeliverPerson_Dashboard/DelPerDashboard.jsx'
import Deliveries from './Components/DeliverPerson_Dashboard/Deliveries.jsx'
import MarkProgress from './Components/DeliverPerson_Dashboard/MarkProgress.jsx'
import SmartTravelAssistance from './pages/Special_Function/SmartTravelAssistance.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 style={{ color: "black" }}>404 Not Found</h1>,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: "rent",
        element: <Rent />,
        children: [
          {
            index: true,
            element: <CarType />
          },
          {
            path: "suv",
            element: < CarType2/>
          },
          {
            path: "sedan",
            element: < CarType3/>
          },
          {
            path: "electric",
            element: < CarType5/>
          }
        ]
      },
      {
        path: 'rent/:id',
        element: <RentCar />
      },
      {
        path: 'smartTravel',
        element: <SmartTravelAssistance />
      }
    ]
  }, 
  {
    path: 'login',
    element: <Login />
  },
  {
    path: 'signup',
    element: <SignUp />
  },
  {
    path: 'admin',
    element: <AdminLogin />
  },
  {
    path: 'adminSignUp',
    element: <AdminSignUp />
  },
  {
    path: 'staff',
    element: <StaffLogin />
  },
  {
    path: 'delMan-login',
    element: <DelManLogin />
  },
  {
    path: 'delPer-login',
    element: <DelPerLogin />
  },
  {
    path: 'a-dashboard',
    element: <AdminDashboard />,
    children: [
      {
        index: true,
        element: <AdminDashboards />
      },
      {
        path: 'manStaff',
        element: <ManageStaff />
      },
      {
        path: 'manUser',
        element: <ManageUser />
      },
      {
        path: 'manDelPerson',
        element: <ManageDelPerson />
      },
      {
        path: 'addUser',
        element: <AddUser />
      },
      {
        path: 'updateUser/:userId',
        element: <UpdateUser />
      },
      {
        path: 'addStaff',
        element: <AddStaff />
      },
      {
        path: 'updateStaff/:userId',
        element: <UpdateStaff />
      },
      {
        path: 'addDelPerson',
        element: <AddDelPerson />
      }
    ]
  },
  {
    path: 's-dash',
    element: <StaffDashboard />,
    children: [
      {
        index: true,
        element: <StaffDashboards />
      },
      {
        path: 'manVehicle',
        element: <ManageVehicle />
      },
      {
        path: 'addVehicle',
        element: <AddVehicle />
      },
      {
        path: 'updateVehicle/:vehicleId',
        element: <UpdateVehicle />
      }
    ]
  },
  {
    path: 'delMan-dash',
    element: <DelManDashboard />,
    children: [
      {
        index: true,
        element: <DelDashboard />
      },
      {
        path: 'manDeliveries',
        element: <ManageDel />
      },
      {
        path: 'updateDelivery/:delId',
        element: <UpdateDelivery />
      },
      {
        path: 'assignDelivery',
        element: <DelPersons />
      },
      {
        path: 'trackDelivery',
        element: <TrackDels />
      }
    ]
  },
  {
    path: 'delPer-dash',
    element: <DelPerDashboard />,
    children: [
      {
        index: true,
        element: <DelPerDash />
      },
      {
        path: 'manADeliveries',
        element: <Deliveries />
      },
      {
        path: 'markProgress',
        element: <MarkProgress />
      }
    ]
  }
  
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} /> 
  </StrictMode>,
)
