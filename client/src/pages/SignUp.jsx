import React, { useContext, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
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
  const [joinUs, setJoinUs] = useState(false);
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
    category: "",
    profileImage: false,
    biography: "",
    portfolioImages: [],
  };

  const [data, setData] = useState(startData);

  function updateData(e) {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  }

  async function authenticate(e) {
    e.preventDefault();

    let endpoint = `${api_port}/api/auth`;
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);

    // If wants to become a freelancer add this additional fields.
    if (joinUs) {
      formData.append("freelancer", joinUs);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      formData.append("category", data.category);
      formData.append("biography", data.biography);
      formData.append("profileImage", data.profileImage);
      // Append each image file individually in order for multer to understand that they're seperate files.
      data.portfolioImages.forEach((file) => {
        formData.append("portfolioImages", file);
      });
      endpoint += "/registerFreelancer";
    } else {
      endpoint += "/register";
    }

    try {
      const response = await axios.post(endpoint, formData);

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
      <form
        onSubmit={authenticate}
        className="login-container sign-up"
        style={{ height: joinUs && "2100px" }}
      >
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

            {joinUs && (
              <>
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
              </>
            )}
          </div>

          {joinUs && (
            <div className="join-us">
              <select
                className="category"
                onChange={updateData}
                name="category"
                value={data.category}
                required
              >
                <option value="" disabled selected hidden>
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
                  name="portfolioImages"
                />
              </div>
            </div>
          )}
        </div>

        <div className="change-auth">
          {joinUs ? (
            <p onClick={() => setJoinUs(false)}>New Here? Sign up</p>
          ) : (
            <p onClick={() => setJoinUs(true)}>
              Join us today, become a freelancer!
            </p>
          )}

          <p onClick={() => navigate("/login")}>
            Already have an account? Login
          </p>
        </div>

        <button type="submit" id="continue">
          Continue
        </button>
      </form>
    </div>
  );
}
