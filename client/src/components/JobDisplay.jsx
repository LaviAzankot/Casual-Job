import React, { useContext } from "react";
import "../../public/styles/jobDisplay.css";
import { StoreContext } from "../context/StoreContext.jsx";
import JobItem from "./JobItem.jsx";

export default function JobDisplay({ category }) {
  const { jobsList } = useContext(StoreContext);

  return (
    <div className="jobDisplay">
      <div className="jobItems">
        {jobsList.map((job, index) => {
          if (job.category === category || category === "All") {
            return (
              <JobItem
                key={index}
                type={"job"}
                id={job.id}
                user_id={job.user_id}
                description={job.description}
                image_url={job.image_url}
                price={job.price}
                date={job.date}
              />
            );
          }
        })}
      </div>
    </div>
  );
}
