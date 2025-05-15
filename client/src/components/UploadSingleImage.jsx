import React, { useState } from "react";
import "../../public/styles/login.css";
import "../../public/styles/imageUpload.css";
import { assets } from "../../assets/assets.js";

export default function UploadSingleImage({ data, setData, name }) {
  const [viewStyles, setViewStyles] = useState({});

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
    setData((prevData) => ({ ...prevData, [name]: e.target.files[0] }));
    showImageOnScreen(e.target.files[0]);
  }

  return (
    <div className="image container">
      <div
        id="upload-area-single"
        onClick={() => document.getElementById(`fileInput${name}`).click()}
      >
        <div id="upload-area-view" style={viewStyles}>
          {!data[name] && (
            <>
              <img id="upload-file" src={assets.picture} alt="upload file" />
              <p>Drag & Drop or browse</p>
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
        </div>
      </div>
    </div>
  );
}
