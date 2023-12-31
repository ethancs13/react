import React, { useState } from "react";
import axios from 'axios';
import '../css/App.css';
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Login } from './Login';


export const Register = () => {
    const navigate = useNavigate();

    const [fn, setFn] = useState('')
    const [ln, setLn] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3001/signup', { fn: fn, ln: ln, email: email, password: password })
            .then((data) => {
                if (data.data.Status === 'Success') {
                    navigate('/login');
                } else {
                    alert('Error');
                }
                setFn('');
                setLn('');
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
                    <label htmlFor="fn">first name</label>
                    <input value={fn} onChange={(e) => setFn(e.target.value)} type="text" placeholder="John" id="fn" name="fn" />
                    <label htmlFor="ln">last name</label>
                    <input value={ln} onChange={(e) => setLn(e.target.value)} type="text" placeholder="Doe" id="ln" name="ln" />
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password">password</label>
                    <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
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