import React, { useContext, useEffect, useState } from "react";
import "../../public/styles/manage.css";
import { StoreContext } from "../context/StoreContext";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Manage() {
  const { api_port, token } = useContext(StoreContext);
  const [userJobs, setUserJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getUserJobs() {
    try {
      setLoading(true);
      if (token) {
        const response = await axios.post(
          `${api_port}/api/jobs/userJobs`,
          {},
          { headers: { token } }
        );
        if (response.data.success) {
          setUserJobs(response.data.data);
        }
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteClick(id) {
    const response = await axios.post(
      `${api_port}/api/jobs/delete`,
      { id: id },
      {
        headers: { token },
      }
    );
    if (response.data.success) {
      await getUserJobs();
      toast.success(response.data.message);
    }
  }

  function handleEditClick(id) {
    navigate(`/manage/edit?id=${id}`);
  }

  useEffect(() => {
    if (token) {
      getUserJobs();
    }
  }, []);
  /*onClick={navigate('/manage/add')} */
  return (
    <div className="manage">
      <Toaster />

      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="manage-jobs">
          {userJobs.map((job, index) => {
            return (
              <div key={index} className="manage-job">
                <img src={`${api_port}/images/` + job.image_url} alt="" />
                <hr />
                <p>
                  <span>Description:</span> {job.description}
                </p>
                <p>
                  <span>Category:</span> {job.category}
                </p>
                <p>
                  <span>Date:</span> {job.date}
                </p>
                <p>
                  <span>Price:</span> ${job.price}
                </p>
                <p>
                  <span>Requirements:</span> {job.requirement1},{" "}
                  {job.requirement2}, {job.requirement3}
                </p>
                <div className="actions">
                  <div className="edit" onClick={() => handleEditClick(job.id)}>
                    <EditIcon fontSize="medium" sx={{ color: "#f7d050" }} />
                  </div>
                  <div
                    className="delete"
                    onClick={() => handleDeleteClick(job.id)}
                  >
                    <DeleteIcon fontSize="medium" sx={{ color: "#f7d050" }} />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="add" onClick={() => navigate("/manage/add")}>
            <button>+</button>
          </div>
        </div>
      )}
    </div>
  );
}
