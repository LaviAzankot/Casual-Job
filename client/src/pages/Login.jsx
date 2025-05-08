import React, { useContext, useState } from "react";
import "../../public/styles/login.css";
import { assets } from "../../assets/assets.js";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { api_port, setToken } = useContext(StoreContext);
  const [authType, setAuthType] = useState("Login");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const startData = {
    email: "",
    password: "",
    name: "",
    phone: "",
    address: "",
  };

  const [data, setData] = useState(startData);

  function updateData(e) {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }

  async function authenticate(e) {
    e.preventDefault();

    let authUrl = `${api_port}/api/auth`;
    if (authType === "Sign Up") {
      authUrl += "/register";
    } else {
      authUrl += "/login";
    }

    const response = await axios.post(authUrl, data);
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
      <form
        onSubmit={authenticate}
        className={`login-container ${authType === "Sign Up" && "sign-up"}`}
      >
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
          {authType === "Sign Up" && (
            <>
              <input
                type="text"
                name="name"
                onChange={updateData}
                value={data.name}
                placeholder="Name"
                required
              />
              <input
                type="text"
                name="phone"
                onChange={updateData}
                value={data.phone}
                placeholder="Phone"
                required
              />
              <input
                type="text"
                name="address"
                onChange={updateData}
                value={data.address}
                placeholder="Address"
                required
              />
            </>
          )}
        </div>
        {authType === "Login" ? (
          <p className="change-auth" onClick={() => setAuthType("Sign Up")}>
            New Here? Sign up
          </p>
        ) : (
          <p className="change-auth" onClick={() => setAuthType("Login")}>
            Already in the club? Login
          </p>
        )}
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}
