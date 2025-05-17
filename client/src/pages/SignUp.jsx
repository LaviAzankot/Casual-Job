import React, { useContext, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
/*import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";*/
import "../../public/styles/login.css";
import { assets } from "../../assets/assets.js";
import axios from "axios";
import { StoreContext } from "../context/StoreContext.jsx";
import { useNavigate } from "react-router-dom";
import UploadSingleImage from "../components/UploadSingleImage.jsx";
import UploadMultiImages from "../components/UploadMultiImages.jsx";

export default function SignUp() {
  const { api_port, setToken } = useContext(StoreContext);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline"],
      [{ align: [] }, { color: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ direction: "rtl" }],
    ],
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "align",
    "color",
    "list",
    "bullet",
    "direction",
  ];

  const startData = {
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    profileImage: false,
    biography: "",
    profolioImages: [],
  };

  const [data, setData] = useState(startData);

  function updateData(e) {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }

  async function authenticate(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phone", data.phone);
    formData.append("address", data.address);
    formData.append("biography", data.biography);
    formData.append("profileImage", data.profileImage);
    // Append each image file individually in order for multer to understand that they're seperate files.
    data.profolioImages.forEach((file) => {
      formData.append("profolioImages", file);
    });

    try {
      const response = await axios.post(
        `${api_port}/api/auth/register`,
        formData
      );

      if (response.data.success) {
        // Authanticate the user & set the data to the start data
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setData(startData);
        navigate("/");
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login">
      <form onSubmit={authenticate} className="login-container sign-up">
        <div className="login-title">
          <h2>Welcome to Casual Job</h2>
        </div>

        {message && (
          <div className="login-message">
            <img src={assets.exclamation_mark} alt="exclamation mark" />
            <p>{message}</p>
          </div>
        )}

        <div className="login-fields">
          <div className="login-inputs">
            <input
              type="text"
              name="name"
              onChange={updateData}
              value={data.name}
              placeholder="Name"
              required
              autoFocus="true"
            />
            <input
              type="email"
              name="email"
              onChange={updateData}
              value={data.email}
              placeholder="Email"
              required
            />
            <input
              type="password"
              name="password"
              onChange={updateData}
              value={data.password}
              placeholder="Password"
              required
            />
            <input
              type="text"
              name="phone"
              onChange={updateData}
              value={data.phone}
              placeholder="Phone"
              required
            />
            <input
              type="text"
              name="address"
              onChange={updateData}
              value={data.address}
              placeholder="Address"
              required
            />
          </div>

          <div className="upload-image">
            <p>Profile image</p>
            <UploadSingleImage
              data={data}
              setData={setData}
              name="profileImage"
            />
          </div>

          <div className="biography">
            <p>Biography</p>
            <ReactQuill
              theme="snow"
              onChange={(e) => {
                setData((prevData) => ({
                  ...prevData,
                  biography: e,
                }));
              }}
              value={data.biography}
              modules={modules}
              formats={formats}
              placeholder="Write your biography here!"
            />
          </div>

          <div className="upload-images">
            <p>Profolio images</p>
            <UploadMultiImages
              data={data}
              setData={setData}
              name="profolioImages"
            />
          </div>
        </div>

        <p className="change-auth" onClick={() => navigate("/login")}>
          Already have an account? Login
        </p>

        <button type="submit" id="continue">
          Continue
        </button>
      </form>
    </div>
  );
}
