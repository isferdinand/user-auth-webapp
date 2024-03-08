import React from 'react';
import '../../App.css'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    return (
        <div className="wrap">
            <h1 className='title'>User Management</h1>
            <p>Web application that  authenticates users and reset password.</p>
            <Link to={'/'}>
                <button className='logout'>Log out</button>
            </Link>
        </div>
    )
}

export default Dashboard