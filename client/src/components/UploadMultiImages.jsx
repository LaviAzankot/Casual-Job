import React, { useState } from "react";
import "../../public/styles/login.css";
import "../../public/styles/imageUpload.css";
import { assets } from "../../assets/assets.js";

export default function UploadMultiImages({ data, setData, name }) {
  const [imageURLs, setImageURLs] = useState([]);

  function showImagesOnScreen() {
    const newImageURLs = data[name].map((image) => URL.createObjectURL(image));
    setImageURLs(newImageURLs);
  }

  function uploadImage(e) {
    if (data[name].length < 6) {
      const newFilesData = data[name];
      newFilesData.push(e.target.files[0]);
      console.log(newFilesData);
      setData((prevData) => ({
        ...prevData,
        [name]: newFilesData,
      }));
      showImagesOnScreen();
    }
  }

  function removeUpload(index) {
    const newImagesArray = data[name];
    newImagesArray.splice(index, 1);
    setData((prevData) => ({
      ...prevData,
      [name]: newImagesArray,
    }));
    showImagesOnScreen();
  }

  /* import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";             {imageURLs.map((imageURL) => {
                return (
                  <SwiperSlide>
                    <img src={imageURL} alt="profolio-image" />
                  </SwiperSlide>
                );
              })}
            </Swiper> */

  return (
    <div className="image container">
      <div
        id="upload-area-multi"
        style={{ height: data[name].length !== 0 && "800px" }}
      >
        <div
          id="upload-area-view"
          onClick={() => document.getElementById(`fileInput${name}`).click()}
        >
          <img id="upload-file" src={assets.picture} alt="upload file" />
          <p>Drag & Drop or browse</p>
          <span>Supports: JPEG, JPG, PNG</span>

          <input
            onChange={uploadImage}
            type="file"
            id={`fileInput${name}`}
            accept="image/*"
            hidden
          />
        </div>
        <div className="uploads">
          {imageURLs.map((imageURL, index) => {
            return (
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
