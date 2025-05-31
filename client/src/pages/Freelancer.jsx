import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useParams } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../context/StoreContext";
import "../../public/styles/freelancer.css";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Pencil, Trash2 } from "lucide-react";

export default function Freelancer() {
  const { api_port, token } = useContext(StoreContext);

  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [freelancer, setFreelancer] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userId, setUserId] = useState(0);
  const [onEdit, setOnEdit] = useState(false);
  const [editId, setEditId] = useState(false);

  const reviewStartData = {
    serviceDesc: "",
    review: "",
    rating: 1,
  };

  const [reviewData, setReviewData] = useState(reviewStartData);

  /* Handle data */
  function updateData(e) {
    setReviewData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  // Get freelancer data
  async function getFreelancer() {
    const response = await axios.get(
      `${api_port}/api/auth/getFreelancer/${id}`
    );

    setFreelancer(response.data.freelancer);
  }

  // Get freelancer reviews
  async function getReviews() {
    const response = await axios.get(`${api_port}/api/review/getReviews/${id}`);
    setReviews(response.data.reviews);
  }

  // Get current user id
  async function getUserId() {
    const response = await axios.get(`${api_port}/api/auth/getUserId/${token}`);
    setUserId(response.data.userId);
  }

  useEffect(() => {
    // Get data
    async function getData() {
      try {
        if (token) {
          await getUserId();
        }
        await getFreelancer();
        await getReviews();
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  // Add/Edit a rating
  async function handleRating(e) {
    e.preventDefault();
    var endpoint = `${api_port}/api/review/add`;

    const payload = {
      reviewer_id: userId,
      reviewed_user_id: id,
      short_service_desc: reviewData.serviceDesc,
      review: reviewData.review,
      rating: reviewData.rating,
    };

    if (onEdit) {
      endpoint = `${api_port}/api/review/edit`;
      payload.id = editId;
    }

    try {
      const response = await axios.post(endpoint, payload);
      if (response.data.success) {
        if (onEdit) {
          setOnEdit(false);
          setEditId(false);
        }
        setReviewData(reviewStartData);
        await getReviews();
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Handle edit click
  function handleEditClick(review) {
    // Set the input fields to the review data
    setReviewData((prevData) => ({
      ...prevData,
      serviceDesc: review.short_service_desc,
      review: review.review,
      rating: review.rating,
    }));
    setOnEdit(true);
    setEditId(review.id);
  }

  // Delete a review
  async function handleDeleteClick(review) {
    const payload = {
      review_id: review.id,
      reviewed_user_id: id,
    };

    const response = await axios.post(`${api_port}/api/review/remove`, payload);
    if (response.data.success) {
      await getReviews();
    }
  }

  return (
    <div className="freelancer-page">
      {!loading && (
        <div className="freelancer-card">
          <div className="freelancer-header">
            <img
              src={`${api_port}/images/${freelancer.profile_image}`}
              alt={`${freelancer.name} profile`}
              className="profile-img"
            />
            <div className="freelancer-info">
              <h2 className="freelancer-name">{freelancer.name}</h2>
              <span className="freelancer-category">{freelancer.category}</span>
              <span className="freelancer-phone">📞 {freelancer.phone}</span>
            </div>
          </div>
          <div className="freelancer-biography">
            <h3>About</h3>
            <ReactQuill
              value={freelancer.biography}
              readOnly={true}
              theme="bubble"
            />
          </div>

          <div className="freelancer-gallery">
            <h3>Portfolio</h3>
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
              {freelancer.portfolio_images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={`${api_port}/images/${img}`}
                    alt="Portfolio image"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="freelancer-rating-container">
            {token && (
              <>
                <div className="rating-form-header">
                  <h3>Leave a Review</h3>
                </div>

                <form className="rating-form-fields" onSubmit={handleRating}>
                  <div className="rating-input-group">
                    <p>Service Description</p>
                    <input
                      type="text"
                      placeholder="Service description"
                      name="serviceDesc"
                      value={reviewData.serviceDesc}
                      onChange={updateData}
                      required
                    />
                  </div>

                  <div className="rating-input-group">
                    <p>Review</p>
                    <textarea
                      placeholder="Write your review..."
                      name="review"
                      value={reviewData.review}
                      onChange={updateData}
                      required
                    />
                  </div>

                  <div className="rating-input-group">
                    <p>Rating (1–10)</p>
                    <input
                      type="number"
                      placeholder="Rating (1-10)"
                      name="rating"
                      value={reviewData.rating}
                      onChange={updateData}
                      min="1"
                      max="10"
                      required
                    />
                  </div>

                  <button type="submit" id="submit-review">
                    {onEdit ? "Update Review" : "Submit Review"}
                  </button>
                </form>
              </>
            )}
            <div className="submitted-reviews">
              {reviews.map((review, index) => (
                <div className="review-card" key={index}>
                  <div className="review-header">
                    <p className="service-name">{review.short_service_desc}</p>
                    <span className="rating-score">⭐ {review.rating}/10</span>
                  </div>
                  <p className="review-text">"{review.review}"</p>
                  {userId !== null && review.reviewer_id == userId && (
                    <div className="review-actions">
                      <Pencil
                        className="icon edit-icon"
                        onClick={() => handleEditClick(review)}
                        title="Edit Review"
                      />
                      <Trash2
                        className="icon delete-icon"
                        onClick={() => handleDeleteClick(review)}
                        title="Delete Review"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
