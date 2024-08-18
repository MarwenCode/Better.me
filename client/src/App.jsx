import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import './App.css'
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import Journeys from "./pages/journeys/Journeys";
import JourneyDetail from "./components/journeydetail/JourneyDetail";
import Communities from "./pages/communities/Communities";
import Register from "./pages/register/Register";

function App() {
 

  return (
    <Router>
    <div className="container">
     <Navbar />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/" element={<Home />} />
        <Route path="/communities" element={<Communities />} />
        <Route path="/journeys" element={<Journeys />} />
        <Route path="/journey/:id" element={<JourneyDetail />} />
 
      </Routes>
      {/* <Footer /> */}
    </div>
  </Router>
  )
}

export default App
