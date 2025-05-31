/*import React, { useContext, useState } from "react";
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
*/

import React, { useContext, useState } from "react";
import "../../public/styles/jobItem.css";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import Heart from "./Heart";

export default function JobItem({
  id,
  name,
  phone,
  profileImage,
  biography,
  profolioImages,
}) {
  const navigate = useNavigate();
  const { addFav, favourites, api_port } = useContext(StoreContext);

  var filledHeart = false;
  // TODO 0: Link the post to its page using navigate () => navigate(`/?id=${id}`).
  // TODO 1: Add favourite jobs to DB
  // TODO 2: Change the names of the functions instead of jobs to freelancers.

  const [wasClicked, setWasClicked] = useState(filledHeart);

  // Take example from Midrag on how to display the people and their profolio images,
  // Also add rating and reviews
  return (
    <div className="jobItem">
      <Heart wasClicked={wasClicked} setWasClicked={setWasClicked} />
      <div className="jobItemImage" onClick={() => navigate(`/?id=${id}`)}>
        Change to show a carousel of profolio images
        <img src={api_port + "/images/" + profileImage} alt="job image" />
      </div>
      <div className="jobItemInfo" onClick={() => navigate(`/?id=${id}`)}>
        Add name Here
      </div>
    </div>
  );
}
