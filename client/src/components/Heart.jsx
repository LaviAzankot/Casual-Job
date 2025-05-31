import React from "react";
import { assets } from "../../assets/assets";
import "../../public/styles/heart.css";

export default function Heart({ wasClicked, setWasClicked, onClick }) {
  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      setWasClicked(!wasClicked);
    }
  };

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
