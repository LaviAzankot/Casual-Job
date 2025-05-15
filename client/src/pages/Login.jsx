import React, { useContext, useState } from "react";
import "../../public/styles/login.css";
import { assets } from "../../assets/assets.js";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { api_port, setToken } = useContext(StoreContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const startData = {
    email: "",
    password: "",
  };

  const [data, setData] = useState(startData);

  function updateData(e) {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }

  async function authenticate(e) {
    e.preventDefault();

    const response = await axios.post(`${api_port}/api/auth/login`, data);
    if (response.data.success) {
      // Authanticate the user & set the data to the start data
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setData(startData);
      navigate("/");
    } else {
      setMessage(response.data.message);
    }
  }

  return (
    <div className="login">
      <form onSubmit={authenticate} className="login-container">
        <div className="login-title">
          <h2>Welcome to Casual Job</h2>
        </div>

        {message && (
          <div className="login-message">
            <img src={assets.exclamation_mark} alt="exclamation mark" />
            <p>{message}</p>
          </div>
        )}

        <div className="login-inputs">
          <input
            type="email"
            name="email"
            onChange={updateData}
            value={data.email}
            placeholder="Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={updateData}
            value={data.password}
            placeholder="Password"
            required
          />
        </div>

        <p className="change-auth" onClick={() => navigate("/sign-up")}>
          New Here? Sign up
        </p>

        <button type="submit" id="continue">
          Continue
        </button>
      </form>
    </div>
  );
}
