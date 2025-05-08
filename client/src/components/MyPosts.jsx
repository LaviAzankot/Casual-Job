import React, { useContext, useEffect, useState } from "react";
import "../../public/styles/jobDisplay.css";
import { StoreContext } from "../context/StoreContext.jsx";
import JobItem from "./JobItem.jsx";
import axios from "axios";

export default function MyPosts() {
  const { api_port, token } = useContext(StoreContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function getData() {
      if (token) {
        const response = await axios.post(`${api_port}/api/jobs/userJobs`, {
          headers: { token },
        });
        if (response.data.success) {
          setPosts(response.data.data);
        }
      }
    }

    getData();
  }, []);

  return (
    <div className="jobDisplay">
      <div className="jobItems">
        {posts.map((job, index) => {
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
              filledHeart={false}
            />
          );
        })}
      </div>
    </div>
  );
}
