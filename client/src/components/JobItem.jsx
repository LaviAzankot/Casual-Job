import React, { useContext, useState } from "react";
import "../../public/styles/jobItem.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

export default function JobItem({
  type,
  id,
  description,
  image_url,
  price,
  date,
}) {
  const navigate = useNavigate();
  const { addFav, favourites, api_port } = useContext(StoreContext);

  var filledHeart = false;

  favourites.forEach((fav) => {
    if (fav.id || type === "favourite") {
      filledHeart = true;
    }
  });

  const [wasClicked, setWasClicked] = useState(filledHeart);

  return (
    <div className="jobItem">
      <div className="saveItem">
        {!wasClicked ? (
          <img
            onClick={() => {
              setWasClicked(true);
              addFav(id);
            }}
            src={assets.transparent_heart}
            alt="save job"
          />
        ) : (
          <img
            onClick={() => {
              setWasClicked(false);
              addFav(id);
            }}
            src={assets.red_heart}
            alt="save job"
          />
        )}
      </div>
      <div className="jobItemImage" onClick={() => navigate(`/jobs?id=${id}`)}>
        <img src={api_port + "/images/" + image_url} alt="job image" />
      </div>
      <div className="jobItemInfo" onClick={() => navigate(`/jobs?id=${id}`)}>
        <p className="jobItemDesc">{description}</p>
        <p className="jobItemTime">{date}</p>
        <p className="jobItemPrice">${price}</p>
      </div>
    </div>
  );
}
