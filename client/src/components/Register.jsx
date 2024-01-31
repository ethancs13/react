import React, { useState } from "react";
import axios from 'axios';
import '../css/Register.css'; // Import the register CSS file
import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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
        <div className="auth-form-container">
            <h2>Register</h2>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor="fn">First Name</label>
                <input value={fn} onChange={(e) => setFn(e.target.value)} type="text" placeholder="John" id="fn" name="fn" />
                <label htmlFor="ln">Last Name</label>
                <input value={ln} onChange={(e) => setLn(e.target.value)} type="text" placeholder="Doe" id="ln" name="ln" />
                <label htmlFor="email">Email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="youremail@gmail.com" id="email" name="email" />
                <label htmlFor="password">Password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
                <button type="submit">Register</button>
            </form>
            <Link to="/login" className="link-btn">Already have an account? Login here.</Link>
        </div>
    );
}