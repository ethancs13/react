import React, { useState } from "react";
import Home from "./pages/Home";
import './css/App.css';
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import Info from './pages/Info'
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
