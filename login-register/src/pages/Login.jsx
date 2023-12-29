import React, { useState } from "react";
import axios from 'axios';
import './App.css'
import { Register } from './Register'
import Home from './Home';
import { BrowserRouter as Router, useNavigate, Routes, Route, Link } from 'react-router-dom';


export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        

        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            const response = await axios.post(`${apiBaseUrl}/login`, { email, password: pass });
            if (response.data.Status === "Success") {
                setEmail('');
                setPass('');
                navigate('/')
            } else if (response.data.Status === "Unauthorized") {
                setError('Incorrect username or password. Please try again.');
            } else {
                setError('Unexpected result. Please try again.');
            }
        } catch (err) {
            console.error('Error during login request:', err);
            setError('An unexpected error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="App">
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
            </style>
            <div className="auth-form-container">
                <h2>Login</h2>
                {/* Display the error message if there is one */}
                {error && <div className="error-message">{error}</div>}
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor="email">email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                    <label htmlFor="password">password</label>
                    <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                    {/* Submit button with loading state */}
                    <button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Login'}
                    </button>
                </form>
                <Link to="/signup" className="link-btn" >Don't have an account? Register here.</Link>
            </div>
            <Routes>
                {/* <Route exact path='/' element={< Login />}></Route> */}
                <Route exact path='/signup' element={< Register />}></Route>
                <Route exact path='/upload' element={< Home />}></Route>
            </Routes>
        </div>
    )
}