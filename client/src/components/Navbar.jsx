import React, { useState, useContext, useEffect } from "react";
import "../../public/styles/navbar.css";
import { assets } from "../../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext.jsx";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";

export default function Navbar() {
  const [page, setPage] = useState("home");
  const { setToken, token } = useContext(StoreContext);
  const [wasClicked, setWasClicked] = useState(false);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  function handleClick(event) {
    const page = event.currentTarget.getAttribute("name");
    setPage(page);

    if (page === "home") {
      navigate("/");
    } else {
      navigate(page);
    }
  }

  useEffect(() => {
    setWasClicked(false);
  }, [page]);

  return (
    <div className="navbar">
      <div className="large-navbar">
        <img className="logo" src={assets.logo} alt="logo" />
        <ul className="navbarMenu">
          <li
            name="home"
            onClick={handleClick}
            className={page == "home" ? "active" : ""}
          >
            Home
          </li>
        </ul>
        <div className="profile" onClick={() => setWasClicked((prev) => !prev)}>
          <MenuIcon sx={{ fontSize: 40 }} />
          <AccountCircleRoundedIcon sx={{ fontSize: 40 }} />
          <ul
            className="profile-options"
            style={{ display: !wasClicked && "none" }}
          >
            <li name="applies" onClick={handleClick}>
              Applies
            </li>
            <li name="favourites" onClick={handleClick}>
              Favourites
            </li>
            {!token ? (
              <li name="login" onClick={handleClick}>
                Log in
              </li>
            ) : (
              <li onClick={logout}>Logout</li>
            )}
            <li name="manage" onClick={handleClick}>
              Manage
            </li>
          </ul>
        </div>
      </div>

      <div className="navbar-mobile">
        <ul className="navbar-mobile-menu">
          <li name="home" onClick={handleClick}>
            <SearchIcon sx={{ fontSize: 40 }} />
            Explore
          </li>

          <li name="applies" onClick={handleClick}>
            <AssignmentOutlinedIcon sx={{ fontSize: 40 }} />
            Applies
          </li>
          <li name="favourites" onClick={handleClick}>
            <FavoriteBorderIcon sx={{ fontSize: 40 }} />
            Favourites
          </li>
          <li name="login" onClick={handleClick}>
            <AccountCircleOutlinedIcon sx={{ fontSize: 40 }} />
            Log in
          </li>
        </ul>
      </div>
    </div>
  );
}
