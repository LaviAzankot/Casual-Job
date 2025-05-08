import React, { useContext, useEffect, useState } from "react";
import "../../public/styles/addJob.css";
import { StoreContext } from "../context/StoreContext";
import { assets } from "../../assets/assets";
import Requirement from "../components/Requirement";
import axios from "axios";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Add() {
  const { api_port, token } = useContext(StoreContext);
  const requirementsNames = ["requirement1", "requirement2", "requirement3"];

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const startData = {
    category: "Sitter",
    requirement1: "",
    requirement2: "",
    requirement3: "",
    description: "",
    image: false,
    price: 5,
    jsDate: dayjs(new Date()),
  };

  const [data, setData] = useState(startData);
  const [viewStyles, setViewStyles] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  function updateData(e) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "category" && {
        requirement1: "",
        requirement2: "",
        requirement3: "",
      }),
    }));
  }

  function showImageOnScreen(image) {
    // Show the image on the screen
    const imageUrl = URL.createObjectURL(image);
    setViewStyles({
      backgroundImage: `url(${imageUrl})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      overflow: "hidden",
      border: "none",
    });
  }

  function uploadImage(e) {
    setData((prevData) => ({ ...prevData, image: e.target.files[0] }));
    showImageOnScreen(e.target.files[0]);
  }

  async function addJob(e) {
    e.preventDefault();

    // Reformate the jsDate and save it under date key word in data
    const matched = data.jsDate.toString().match(/^.*?\b\d{4}\b/);
    const formattedDate = matched ? matched[0] : "";

    const formData = new FormData();
    formData.append("category", data.category);
    formData.append("requirement1", data.requirement1);
    formData.append("requirement2", data.requirement2);
    formData.append("requirement3", data.requirement3);
    formData.append("description", data.description);
    formData.append("image", data.image);
    formData.append("price", data.price);
    formData.append("date", formattedDate);
    const actionUrl = `${api_port}/api/jobs/${id ? "update" : "create"}`;
    const response = await axios.post(actionUrl, formData, {
      headers: { token },
    });
    if (response.data.success) {
      navigate("/manage");
    } else {
      setMessage(response.data.message);
    }
  }

  async function getFileFromImageUrl(image_url) {
    const fullUrl = `${api_port}/images/${image_url}`;
    const response = await fetch(fullUrl);
    const blob = await response.blob();
    return new File([blob], image_url, { type: blob.type });
  }

  useEffect(() => {
    async function getJobData() {
      if (id !== null) {
        const response = await axios.post(
          `${api_port}/api/jobs/get`,
          { id: id },
          { headers: { token } }
        );
        if (response.data.success) {
          const {
            category,
            requirement1,
            requirement2,
            requirement3,
            description,
            image_url,
            price,
            date,
          } = response.data.job;

          // Convert image URL to file type, in order to be able to render it on screen
          const image = await getFileFromImageUrl(image_url);
          // Convert the date to ISO formmat
          const DayJsDate = dayjs(new Date(date));

          // Set the data
          setData({
            category: category,
            requirement1: requirement1,
            requirement2: requirement2,
            requirement3: requirement3,
            description: description,
            image: image,
            price: price,
            jsDate: DayJsDate,
          });

          showImageOnScreen(image);
        }
      }
    }

    getJobData();
  }, []);

  return (
    <div className="admin">
      <form onSubmit={addJob} className="add-job-container">
        <div className="add-job-fields">
          <div className="category container">
            <p>Category</p>
            <select
              onChange={updateData}
              name="category"
              value={data.category}
              required
            >
              <option value="" disabled hidden>
                Choose Category
              </option>
              <option value="Sitter">Sitter</option>
              <option value="Dog Walker">Dog Walker</option>
              <option value="Programming Tutor">Programming Tutor</option>
              <option value="Math Tutor">Math Tutor</option>
              <option value="English Tutor">English Tutor</option>
              <option value="Science Tutor">Science Tutor</option>
              <option value="Guitar Teacher">Guitar Teacher</option>
              <option value="Piano Teacher">Piano Teacher</option>
              <option value="Garden Pruning">Garden Pruning</option>
              <option value="Editors">Editors</option>
              <option value="Bakers">Bakers</option>
              <option value="Cooks">Cooks</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="requirements-fields container">
            <p>Requirements</p>
            {requirementsNames.map((name, index) => {
              return (
                <Requirement
                  key={index}
                  name={name}
                  category={data.category}
                  updateData={updateData}
                  data={data}
                />
              );
            })}
          </div>

          <div className="description container">
            <p>Description</p>
            <input
              name="description"
              onChange={updateData}
              value={data.description}
              maxLength="100"
              type="text"
              placeholder="Description"
              required
            />
          </div>

          <div className="image container">
            <p>Image</p>
            <div
              id="upload-area"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <div id="upload-area-view" style={viewStyles}>
                {!data.image && (
                  <>
                    <img
                      id="upload-file"
                      src={assets.picture}
                      alt="upload file"
                    />
                    <p>Drage & Drop or browse</p>
                    <span>Supports: JPEG, JPG, PNG</span>
                  </>
                )}
                <input
                  onChange={uploadImage}
                  type="file"
                  id="fileInput"
                  accept="image/*"
                  hidden
                />
              </div>
            </div>
          </div>

          <div className="price container">
            <p>Price</p>
            <input
              name="price"
              onChange={updateData}
              min={5}
              value={data.price}
              type="number"
              placeholder="Price"
              required
            />
          </div>
          <div className="date container">
            <p>Date</p>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  name="jsDate"
                  onChange={(newDate) => {
                    setData((prevData) => ({ ...prevData, jsDate: newDate }));
                  }}
                  value={data.jsDate}
                  required
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </div>

        {message && (
          <div className="login-popup-message">
            <img src={assets.exclamation_mark} alt="exclamation mark" />
            <p>{message}</p>
          </div>
        )}

        <div className="add-jobs-submit">
          <button type="submit">Add</button>
        </div>
      </form>
    </div>
  );
}
