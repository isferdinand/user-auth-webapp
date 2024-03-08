import React, { useEffect, useState } from 'react';
import './login.css'
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios';

const OTPReset = () => {
    // use state hook to store inputs
    const [email, setEmail] = useState('')
    const navigateTo = useNavigate()

    const [emailStatus, setEmailStatus] = useState('')
    const [statusHolder, setStatusHolder] = useState('hideMessage')

    const resetPassword = (e) => {
        //Prevent form submission
        e.preventDefault()

        // Using Axios to create an API that connects to the server
        Axios.post('http://localhost:3002/otp', {
            // Variable to send to server through the route  
            Email: email,
        }).then((response) => {
            if (response.data.Status === "Success") {
                // navigateTo('/resetPassword') 
                setEmailStatus(`Password reset link sent to ${email}`)
            } else {
                setEmailStatus('Email not found')
            }
        })
    }

    useEffect(() => {
        if (emailStatus !== '') {
            setStatusHolder('emailSuccess')
            setTimeout(() => {
                setStatusHolder('hideMessage')
            }, 2000);
        }
    }, [emailStatus])

    return (
        <div className="container">
            <div className="form-wrapper">
                <h1 className="header">Password Reset</h1>
                <form action='' >
                    <span className={statusHolder}>{emailStatus}</span>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name=""
                            placeholder="amapiano@yahoo.com"
                            id="email"
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                        /</div>
                    <button id="signin" type="submit" className="btn btn-reg" onClick={resetPassword} style={{ marginTop: '-20px' }}>Send</button>
                </form>
            </div>
        </div>
    )
}

export default OTPReset