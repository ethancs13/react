import React, { useState } from "react";
import { Link } from 'react-router-dom';
import axios from 'axios';

const Summary = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

    }

    return (
        <div className="auth-form-container">
            <h1>Test</h1>
            <Link to="/" className="link-btn">Back.</Link>
        </div>
    );
}

export default Summary;