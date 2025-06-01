import React, { useContext, useEffect, useState } from "react";
import "../../public/styles/freelancersDisplay.css";
import "../../public/styles/favourites.css";
import { StoreContext } from "../context/StoreContext";
import FreelancerItem from "../components/FreelancerItem.jsx";
import axios from "axios";

export default function Favourites() {
  const { api_port, token } = useContext(StoreContext);
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getFavourites() {
      if (!token) {
        setFavourites([]);
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${api_port}/api/favourite/list`, {
          headers: { token },
        });

        if (response.data.success) {
          setFavourites(response.data.favourites);
        } else {
          console.error("API returned error:", response.data.message);
          setFavourites([]);
        }
      } catch (error) {
        console.error("Error fetching favourites:", error);
        setFavourites([]);
      } finally {
        setLoading(false);
      }
    }

    getFavourites();
  }, [token]);

  return (
    <div className="jobDisplay">
      <h2>My Favourite Freelancers</h2>
      {!token ? (
        <div className="message-container">
          <p className="message">Please log in to see your favourites</p>
        </div>
      ) : loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading favourites...</p>
        </div>
      ) : favourites.length === 0 ? (
        <div className="message-container">
          <p className="message">
            You don't have any favourite freelancers yet
          </p>
        </div>
      ) : (
        <div className="freelancers-display">
          {favourites.map((freelancer, index) => (
            <FreelancerItem
              key={freelancer.id || index}
              freelancer={freelancer}
            />
          ))}
        </div>
      )}
    </div>
  );
}
