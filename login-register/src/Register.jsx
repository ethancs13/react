import React, { useState } from "react";
import axios from 'axios';
import './App.css';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Login } from './Login'
import { useNavigate } from 'react-router-dom';




export const Register = () => {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/signup', { email: email, password: pass })
            .then((data) => {
                if (data.data.Status === 'Success') {
                    navigate('/login');
                } else {
                    alert('Error');
                }
                setEmail('');
                setPass('');
            })

    }

    return (
        <div className="App">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
            </style>
            <div className="auth-form-container">

                <h2>Register</h2>
                <form className="register-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password">password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    <button type="submit">Register</button>
                </form>
                <Link to="/login" className="link-btn">Already have an account? Login here.</Link>

            </div>
            <Routes>
                <Route exact path='/login' element={< Login />}></Route>
            </Routes>
        </div>
    )
}