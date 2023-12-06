import React, { useState } from "react";
import axios from 'axios';
import './App.css'
import { Register } from './Register'
import FileUpload from './FileUpload';
import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:3001/login', { email: email, password: pass })
            .then((data) => {
                console.log(data)
                if (data.data.Status === "Success") {
                    setEmail('');
                    setPass('');
                    return <Navigate to="/" />;
                } else {
                    alert('Incorrect, please try again.')
                    return;
                }
            })
    }

    return (
            <div className="App">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
                </style>
                <div className="auth-form-container">
                    <h2>Login</h2>
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label htmlFor="email">email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                        <label htmlFor="password">password</label>
                        <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                        <button type="submit">Log In</button>
                    </form>
                    <Link to="/signup" className="link-btn" >Don't have an account? Register here.</Link>
                </div>
                <Routes>
                    {/* <Route exact path='/' element={< Login />}></Route> */}
                    <Route exact path='/signup' element={< Register />}></Route>
                    <Route exact path='/upload' element={< FileUpload />}></Route>
                </Routes>
            </div>
    )
}