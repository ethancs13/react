import React, { useState } from "react";
import FileUpload from "./FileUpload";
import './App.css';
import { Login } from "./Login";
import { Register } from "./Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Login />} />
        <Route path="/upload" element={<FileUpload />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
