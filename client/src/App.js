import React, { useState } from "react";
import Home from "./components/Home";
import './css/App.css';
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import Header from "./components/Header";
import Itemized from "./components/Itemized";
import General from "./components/General";
import FoodBev from "./components/FoodBev";
import Files from "./components/Files";
import Summary from "./components/Summary";
import Info from './components/Info';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/itemized" element={<Itemized />} />
        <Route path="/general" element={<General />} />
        <Route path="/food-beverage" element={<FoodBev />} />
        <Route path="/files" element={<Files />} />
        <Route path="/summary" element={<Summary />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login/*" element={<Login />} />
        <Route path="/info/*" element={<Info />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;