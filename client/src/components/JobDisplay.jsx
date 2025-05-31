import React, { useContext, useEffect, useState } from "react";
import "../../public/styles/jobDisplay.css";
import { StoreContext } from "../context/StoreContext.jsx";
import JobItem from "./JobItem.jsx";
import axios from "axios";

/*export default function JobDisplay({ category }) {
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
}*/

export default function JobDisplay() {
  const { api_port } = useContext(StoreContext);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    async function getData() {
      const response = await axios.get(`${api_port}/api/auth/getFreelancers`);
      if (response.data.success) {
        setFreelancers(response.freelancers);
      }
    }

    getData();
  }, []);
  /* <div className="jobItems">
        {freelancers.map((freelancer, index) => {
          return (
            <JobItem
              key={index}
              id={freelancer.id}
              name={freelancer.name}
              phone={freelancer.phone}
              profileImage={freelancer.profileImage}
              biography={freelancer.biography}
              profolioImages={freelancer.profolioImages}
            />
          );
        })}
      </div> */
  return <div className="jobDisplay"></div>;
}
