import React, { useState, useEffect } from "react";
import "../../public/styles/login.css";
import "../../public/styles/imageUpload.css";
import { assets } from "../../assets/assets.js";

export default function UploadMultiImages({ data, setData, name }) {
  const [imageURLs, setImageURLs] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (data[name].length > 0) {
      showImagesOnScreen();
    }
  }, []);

  // Simulate upload progress when a file is selected
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 25, 100));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  function showImagesOnScreen() {
    const newImageURLs = data[name].map((image) => URL.createObjectURL(image));
    setImageURLs(newImageURLs);
  }

  function uploadImage(e) {
    if (data[name].length < 6) {
      // Start progress animation
      setProgress(25);

      const newFilesData = [...data[name]];
      newFilesData.push(e.target.files[0]);

      setData((prevData) => ({
        ...prevData,
        [name]: newFilesData,
      }));

      const newImageURLs = [
        ...imageURLs,
        URL.createObjectURL(e.target.files[0]),
      ];
      setImageURLs(newImageURLs);
    }
  }

  function removeUpload(index) {
    const newImagesArray = [...data[name]];
    newImagesArray.splice(index, 1);

    setData((prevData) => ({
      ...prevData,
      [name]: newImagesArray,
    }));

    const newImageURLs = [...imageURLs];
    newImageURLs.splice(index, 1);
    setImageURLs(newImageURLs);
  }

  function handleDragOver(e) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave() {
    setIsDragging(false);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);

    if (
      e.dataTransfer.files &&
      e.dataTransfer.files[0] &&
      data[name].length < 6
    ) {
      // Start progress animation
      setProgress(25);

      const newFilesData = [...data[name]];
      newFilesData.push(e.dataTransfer.files[0]);

      setData((prevData) => ({
        ...prevData,
        [name]: newFilesData,
      }));

      const newImageURLs = [
        ...imageURLs,
        URL.createObjectURL(e.dataTransfer.files[0]),
      ];
      setImageURLs(newImageURLs);
    }
  }

  // Calculate the container's style based on number of images
  const getContainerStyle = () => {
    // Base height is 350px
    // For each image, add additional height based on grid layout
    const baseHeight = 350;

    // Calculate rows needed based on screen size and number of images
    let imagesPerRow = 3; // Default for desktop
    if (window.innerWidth <= 768 && window.innerWidth > 480) {
      imagesPerRow = 2; // Tablet
    } else if (window.innerWidth <= 480) {
      imagesPerRow = 1; // Mobile
    }

    const rows = Math.ceil(data[name].length / imagesPerRow);
    const rowHeight = 200; // Height per row of images

    // Calculate height based on number of rows
    const calculatedHeight =
      data[name].length > 0 ? baseHeight + rows * rowHeight : baseHeight;

    return {
      minHeight: `${calculatedHeight}px`,
    };
  };

  return (
    <div className="image container">
      <div
        id="upload-area-multi"
        style={getContainerStyle()}
        className={data[name].length > 0 ? "has-images" : ""}
      >
        <div
          id="upload-area-view"
          className={isDragging ? "drag-over" : ""}
          onClick={() => document.getElementById(`fileInput${name}`).click()}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <img id="upload-file" src={assets.picture} alt="upload file" />
          <p>Drag & Drop or click to browse</p>
          <span>Supports: JPEG, JPG, PNG</span>
          {data[name].length >= 6 && (
            <span style={{ color: "#ff5555", marginTop: "5px" }}>
              Maximum 6 images allowed
            </span>
          )}
          <input
            onChange={uploadImage}
            type="file"
            id={`fileInput${name}`}
            accept="image/*"
            hidden
            disabled={data[name].length >= 6}
          />
          {progress > 0 && progress < 100 && (
            <div
              className="upload-progress"
              style={{ width: `${progress}%` }}
            ></div>
          )}
        </div>

        {data[name].length === 0 ? (
          <p className="empty-upload-text">No images uploaded yet</p>
        ) : (
          <div className="uploads">
            {imageURLs.map((imageURL, index) => (
              <div className="upload" key={index}>
                <div className="uploaded-image">
                  <img src={imageURL} alt="uploaded image" />
                </div>
                <div className="remove-upload">
                  <img
                    onClick={() => removeUpload(index)}
                    src={assets.remove}
                    alt="remove image"
                  />
                </div>
                <div className="image-count">
                  {index + 1}/{imageURLs.length}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
