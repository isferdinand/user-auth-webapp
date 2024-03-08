import './App.css';
import Dashboard from './Components/Dashboard/dashboard';
import Register from './Components/Register/register';
import Login from './Components/Login/login';
import OTPReset from './Components/Login/otp';
import PasswordReset from './Components/Login/resetPassword';


//Import React router dom
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

//Creating a react router
const router = createBrowserRouter([
  {
    path: '/',
    element: <div><Login /></div>
  },
  {
    path: '/register',
    element: <div><Register /></div>
  },
  {
    path: '/dashboard',
    element: <div><Dashboard /></div>
  },
  {
    path: '/otp',
    element: <div><OTPReset /></div>
  },
  {
    path: '/resetPassword/:emailLink/:token',
    element: <div><PasswordReset /></div>
  }
])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
