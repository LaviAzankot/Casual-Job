import React, { useContext, useEffect, useState } from "react";
import "../../public/styles/freelancerItem.css";
import { StoreContext } from "../context/StoreContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import Heart from "../components/Heart.jsx";
import axios from "axios";

export default function FreelancerItem({ freelancer }) {
  const { api_port, token } = useContext(StoreContext);
  const [wasClicked, setWasClicked] = useState(false);
  const { id, name, profile_image, portfolio_images } = freelancer;
  const [avgRating, setAvgRating] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  async function getAvgRating() {
    const response = await axios.get(
      `${api_port}/api/review/getAvgRating/${id}`
    );
    setAvgRating(response.data.avgRating);
  }

  async function checkIfFavorite() {
    if (token) {
      try {
        const response = await axios.post(
          `${api_port}/api/favourite/get/${id}`,
          {},
          { headers: { token } }
        );
        setWasClicked(response.data.favourite);
      } catch (error) {
        console.error("Error checking favorite status:", error);
      }
    }
  }

  function handleCardClick() {
    navigate(`/freelancers/${id}`);
  }

  function stopPropagation(e) {
    e.stopPropagation();
  }

  useEffect(() => {
    async function getData() {
      await Promise.all([getAvgRating(), checkIfFavorite()]);
      setLoading(false);
    }

    getData();
  }, [id, token]);

  return (
    <div className="freelancer">
      <hr />
      {!loading && (
        <div className="freelancer-card" onClick={handleCardClick}>
          <div className="freelancer-header">
            <div className="profile-container">
              <img
                src={`${api_port}/images/${profile_image}`}
                alt={`${name} profile image`}
                className="profile-img"
              />
            </div>

            <div className="freelancer-info">
              <h2 className="freelancer-name">{name}</h2>
              <span className="freelancer-category">{freelancer.category}</span>
              <div className="freelancer-operations" onClick={stopPropagation}>
                <div className="freelancer-favourite">
                  <Heart
                    freelancerId={id}
                    wasClicked={wasClicked}
                    setWasClicked={setWasClicked}
                  />
                </div>
                <span className="freelancer-rating">⭐ {avgRating}/10</span>
              </div>
            </div>
          </div>

          <div className="freelancer-gallery" onClick={stopPropagation}>
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
              }}
            >
              {portfolio_images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${api_port}/images/${img}`}
                    alt="Portfolio image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
