import React, { useEffect, useState } from 'react';
import './login.css'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios';

const Login = () => {
    // use state hook to store inputs
    const [loginRegno, setLoginRegno] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const navigateTo = useNavigate()

    const [loginStatus, setLoginStatus] = useState('')
    const [statusHolder, setStatusHolder] = useState('hideMessage')

    const loginUser = (e) => {
        //Prevent form submission
        e.preventDefault()

        // Using Axios to create an API that connects to the server
        Axios.post('http://localhost:3002/login', {
            // Variable to send to server through the route  
            LoginRegNo: loginRegno,
            LoginPassword: loginPassword
        }).then((response) => {
            if (response.data.message || loginRegno == '' || loginPassword == '') {
                navigateTo('/') //This navigates to the same page if credentials don't match
                setLoginStatus('Invalid username or password')
            } else {
                navigateTo('/dashboard')
            }
        })
    }

    // Clear form after submission
    const clearOnSubmit = () => {
        setLoginRegno('')
        setLoginPassword('')
    }

    useEffect(() => {
        if (loginStatus !== '' || loginStatus === 'Invalid username or password') {
            setStatusHolder('showMessage')
            setTimeout(() => {
                setStatusHolder('hideMessage')
            }, 2000);
        }
    }, [loginStatus])

    return (
        <div className="container">
            <div className="form-wrapper">
                <h1 className="header">Login</h1>
                <form action='' onSubmit={clearOnSubmit}>
                    <span className={statusHolder}>{loginStatus}</span>
                    <div className="input-wrapper">
                        <label htmlFor="regno">Username:</label>
                        <input type="text" name="" placeholder="username" id="regno" onChange={(event) => {
                            setLoginRegno(event.target.value)
                        }} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password: </label>
                        <input type="password" name="" id="password" onChange={(event) => {
                            setLoginPassword(event.target.value)
                        }} />
                    </div>
                    <button id="signin" type="submit" className="btn btn-reg" onClick={loginUser}>Sign In</button>
                    <Link to={'/otp'} className='pasreset'>
                        Forgot password?
                    </Link>
                    <a href="/"></a>
                    <div className="member">
                        Don't have an account?
                        <Link to={'/register'} className='member-login'>
                            Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login