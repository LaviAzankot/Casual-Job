import React, { useContext } from "react";
import "../../public/styles/jobDisplay.css";
import "../../public/styles/favourites.css";
import { StoreContext } from "../context/StoreContext";
import JobItem from "../components/JobItem";

export default function Favourites() {
  const { favourites } = useContext(StoreContext);

  return (
    <div className="jobDisplay">
      <p className="message">Favourite Jobs are shown here!</p>
      <div className="jobItems">
        {favourites.map((job, index) => {
          return (
            <JobItem
              key={index}
              type={"favourite"}
              id={job.id}
              user_id={job.user_id}
              description={job.description}
              image_url={job.image_url}
              hardness={job.hardness}
              price={job.price}
              time={job.time}
              filledHeart={true}
            />
          );
        })}
      </div>
    </div>
  );
}
