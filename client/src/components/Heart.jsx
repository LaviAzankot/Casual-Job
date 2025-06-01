import React, { useContext } from "react";
import { assets } from "../../assets/assets";
import "../../public/styles/heart.css";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";

export default function Heart({ freelancerId, wasClicked, setWasClicked }) {
  const { api_port, token } = useContext(StoreContext);

  async function handleClick() {
    const newState = !wasClicked;
    setWasClicked(newState);
    try {
      // If true then add favourite
      if (newState) {
        await axios.post(
          `${api_port}/api/favourite/add`,
          { favourite_user_id: freelancerId },
          { headers: { token } }
        );
        // If false then remove favourite
      } else {
        await axios.post(
          `${api_port}/api/favourite/remove`,
          { favourite_user_id: freelancerId },
          { headers: { token } }
        );
      }
    } catch (error) {
      console.log(error);
      // Reverse the changes if an error occourss
      setWasClicked(!newState);
    }
  }

  return (
    <div className="saveItem">
      {!wasClicked ? (
        <img
          onClick={handleClick}
          src={assets.transparent_heart}
          alt="save job"
        />
      ) : (
        <img onClick={handleClick} src={assets.red_heart} alt="save job" />
      )}
    </div>
  );
}
