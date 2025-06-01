import React, { useState, useEffect } from "react";
import "../../public/styles/login.css";
import "../../public/styles/imageUpload.css";
import { assets } from "../../assets/assets.js";

export default function UploadSingleImage({ data, setData, name }) {
  const [viewStyles, setViewStyles] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate upload progress when a file is selected
  useEffect(() => {
    if (progress > 0 && progress < 100) {
      const timer = setTimeout(() => {
        setProgress((prev) => Math.min(prev + 25, 100));
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  function showImageOnScreen(image) {
    // Reset progress for new upload
    setProgress(25);

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
    setData((prevData) => ({ ...prevData, [name]: e.target.files[0] }));
    showImageOnScreen(e.target.files[0]);
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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setData((prevData) => ({ ...prevData, [name]: e.dataTransfer.files[0] }));
      showImageOnScreen(e.dataTransfer.files[0]);
    }
  }

  return (
    <div className="image container">
      <div
        id="upload-area-single"
        onClick={() => document.getElementById(`fileInput${name}`).click()}
      >
        <div
          id="upload-area-view"
          className={`${isDragging ? "drag-over" : ""} ${
            data[name] ? "upload-area-view-uploaded" : ""
          }`}
          style={viewStyles}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {!data[name] && (
            <>
              <img id="upload-file" src={assets.picture} alt="upload file" />
              <p>Drag & Drop or click to browse</p>
              <span>Supports: JPEG, JPG, PNG</span>
            </>
          )}
          <input
            onChange={uploadImage}
            type="file"
            id={`fileInput${name}`}
            accept="image/*"
            hidden
          />
          {progress > 0 && progress < 100 && (
            <div
              className="upload-progress"
              style={{ width: `${progress}%` }}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
}
