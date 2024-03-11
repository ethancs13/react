import React, { useState } from "react";
import axios from 'axios';
import '../css/Login.css'; // Import the login CSS file

import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // await new Promise(resolve => setTimeout(resolve, 1000));
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
        <div className="auth-form-container">
            <h2>Login</h2>
            {error && <div className="error-message">{error}</div>}
            <form className="login-form" onSubmit={handleSubmit}>
                <label className="login-label" htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label className="login-label" htmlFor="password">Password</label>
                <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </form>
            <Link to="/signup" className="link-btn">Don't have an account? Register here.</Link>
        </div>
    );
}
