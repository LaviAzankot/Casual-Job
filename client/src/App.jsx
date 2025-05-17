import React from "react";
import "../public/styles/app.css";
import Home from "./pages/Home.jsx";
import { Route, Routes } from "react-router-dom";
import Job from "./pages/Job.jsx";
import Navbar from "./components/Navbar.jsx";
import Favourites from "./pages/Favourites.jsx";
import Applies from "./pages/Applies.jsx";
import Login from "./pages/Login.jsx";
import Manage from "./pages/Manage.jsx";
import Add from "./pages/Add.jsx";
import SignUp from "./pages/SignUp.jsx";

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/applies" element={<Applies />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/manage/add" element={<Add />} />
        <Route path="/manage/edit" element={<Add />} />
      </Routes>
    </div>
  );
}
