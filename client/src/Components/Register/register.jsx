import React, { useState } from 'react';
import './register.css';
import '../../App.css'
import { Link, useNavigate } from 'react-router-dom'
import Axios from 'axios'
import baseUrl from '../../baseUrl';


const Register = () => {
    //Use state to hold inputs
    const [regno, setRegno] = useState('')
    const [fullName, setFullname] = useState('')
    const [phoneno, setPhoneno] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigateTo = useNavigate()

    const createUser = (e) => {
        e.preventDefault()
        // Using Axios to create an API that connects to the server
        Axios.post(`${baseUrl}/register`, {
            // Variable to send to server through the route  
            RegNo: regno,
            FullName: fullName,
            PhoneNo: phoneno,
            Email: email,
            Password: password
        }).then(() => {
            navigateTo('/')

            setRegno('')
            setFullname('')
            setPhoneno('')
            setEmail('')
            setPassword('')
        })
    }

    return (
        <div className="container">
            <div className="form-wrapper">
                <h1 className="header">Sign Up</h1>
                <form action=''>
                    <span className="hide-message">Registration successful</span>
                    <div className="input-wrapper">
                        <label htmlFor="regnumber">Reg No:</label>
                        <input
                            type="text"
                            name=""
                            placeholder="CS/MG/0000/01/20"
                            id="regnumber"
                            onChange={(event) => {
                                setRegno(event.target.value)
                            }}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="fullnamer">Full Name:</label>
                        <input
                            type="text"
                            name=""
                            placeholder="Jesire Doe"
                            id="fullname"
                            onChange={(event) => {
                                setFullname(event.target.value)
                            }}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="contact">Phone number:</label>
                        <input
                            type="number"
                            name=""
                            placeholder="0700111222"
                            id="contact"
                            min={0}
                            onChange={(event) => {
                                setPhoneno(event.target.value)
                            }}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="text"
                            name=""
                            placeholder="test@yahoo.com"
                            id="email"
                            onChange={(event) => {
                                setEmail(event.target.value)
                            }}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Enter password:</label>
                        <input
                            type="password"
                            name=""
                            placeholder="Password"
                            id="password"
                            onChange={(event) => {
                                setPassword(event.target.value)
                            }}
                        />
                    </div>
                    {/* <div className="input-wrapper">
                        <input
                            type="password"
                            name=""
                            placeholder="Confirm Password"
                            id="conpassword"
                        />
                    </div> */}
                    <div className="input-wrapper">
                        <button id="signupinp" type="submit" className="btn btn-reg" onClick={createUser}>
                            Sign Up
                        </button>
                        <div className="member">
                            Already have an account?
                            <Link to={'/'} className="member-login">
                                Login
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
