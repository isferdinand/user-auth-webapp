import React, { useEffect, useState } from 'react';
import './login.css'
import '../../App.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios';

const PasswordReset = () => {
    // use state hook to store inputs
    const [passwdreset, setPasswdReset] = useState('')
    // const [confirmpasswd, setConfirmPasswd] = useState('')
    const navigateTo = useNavigate()

    const { emailLink, token } = useParams()

    const [resetStatus, setResetStatus] = useState('')
    const [statusHolder, setStatusHolder] = useState('hideMessage')

    const resetPasswd = (e) => {
        //Prevent form submission
        e.preventDefault()

        // Using Axios to create an API that connects to the server
        Axios.post(`http://localhost:3002/resetPassword/${emailLink}/${token}`, {
            // Variable to send to server through the route  
            PasswdReset: passwdreset,
            // ConfirmPasswd: confirmpasswd
        }).then((response) => {
            if (response.data.Status === "Success") {
                navigateTo('/')
            } else {
                setResetStatus('Password Reset Failed!')
            }
        })
    }

    useEffect(() => {
        if (resetStatus !== '') {
            setStatusHolder('resetSuccess')
            setTimeout(() => {
                setStatusHolder('hideMessage')
            }, 3000);
        }
    }, [resetStatus])

    return (
        <div className="container">
            <div className="form-wrapper">
                <h1 className="header">Login</h1>
                <form action=''>
                    <span className={statusHolder}>{resetStatus}</span>
                    <div className="input-wrapper">
                        <label htmlFor="password">Enter new password: </label>
                        <input type="password" name="" id="password" onChange={(event) => {
                            setPasswdReset(event.target.value)
                        }} />
                    </div>
                    {/* <div className="input-wrapper">
                        <label htmlFor="confpassword">Confirm Password: </label>
                        <input type="password" name="" id="confpassword" onChange={(event) => {
                            setConfirmPasswd(event.target.value)
                        }} />
                    </div> */}
                    <button id="signin" type="submit" className="btn btn-reg" onClick={resetPasswd}>Reset Password</button>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset