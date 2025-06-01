import React from "react";
import "../public/styles/app.css";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Freelancer from "./pages/Freelancer.jsx";
import Favourites from "./pages/Favourites.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/freelancers/:id" element={<Freelancer />} />
      </Routes>
    </div>
  );
}
