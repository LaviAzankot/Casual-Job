import React, { useContext, useEffect, useState } from "react";
import "../../public/styles/freelancersDisplay.css";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import FreelancerItem from "./FreelancerItem.jsx";

export default function FreelancersDisplay() {
  const { api_port } = useContext(StoreContext);
  const [loading, setLoading] = useState(true);
  const [freelancers, setFreelancers] = useState([]);

  useEffect(() => {
    // Get freelancers list
    async function getFreelancers() {
      try {
        const response = await axios.get(`${api_port}/api/auth/getFreelancers`);
        setFreelancers(response.data.freelancers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getFreelancers();
  }, []);

  return (
    <div className="freelancers-display">
      {!loading &&
        freelancers.map((freelancer, index) => {
          return <FreelancerItem key={index} freelancer={freelancer} />;
        })}
    </div>
  );
}
