import React, { useState } from "react";
import Home from "./components/Home";
import './css/App.css';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Info from './components/Info'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/info/*" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
