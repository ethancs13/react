import React, { useState } from "react";
import AddDeleteTableRows from "./addDeleteTables";
import './App.css'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


export const Itemized = () => {

    axios.defaults.withCredentials = true;

    const handleSubmit = (e) => {
        e.preventDefault()
    }
    return (
        <div>
            <div>Hello World to items!</div>
            <Link to="/">Back to form</Link>
            
            <AddDeleteTableRows />
            <form onSubmit={handleSubmit}>

            </form>
        </div>

    )
}

export default Itemized;