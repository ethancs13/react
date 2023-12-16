import React, { useState } from "react";
import Home from "./Home";
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import Info from './Info'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/info/*" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
