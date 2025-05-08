import React, { useContext, useEffect, useState } from "react";
import "../../public/styles/job.css";
import { useSearchParams } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { assets, jobCategories } from "../../assets/assets";

export default function Job() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");

  const { api_port, applyToJob } = useContext(StoreContext);
  const [job, setJob] = useState({});
  const [reqImage, setReqImage] = useState("");

  useEffect(() => {
    async function getJob() {
      const response = await axios.post(`${api_port}/api/jobs/get`, {
        id: Number(id),
      });

      if (response.data.success) {
        setJob(response.data.job);
        setReqImage(
          "../.." +
            jobCategories.find(
              (category) => category.name === response.data.job.category
            ).image
        );
      }
    }

    getJob();
  }, []);

  const [didApply, setDidApply] = useState(false);

  function apply() {
    const response = applyToJob(id);
    setDidApply((prev) => !prev);
    toast.success(response.message);
  }

  return (
    <div className="job">
      <div className="previewImage">
        <img src={api_port + "/images/" + job.image_url} alt="job image" />
      </div>
      <div className="info">
        <div className="details">
          <p id="title">{job.description}</p>
          <p id="date">On {job.date}</p>
          <p id="price">${job.price} per job</p>
        </div>
        <hr />
        <div className="host">
          <img src={assets.user1} alt="host image" />
          <p>Lavi Azankot</p>
        </div>
        <hr />
        <ul className="requirments">
          <div className="requirment">
            <img src={reqImage} alt="checked image" />
            <p>{job.requirement1}</p>
          </div>
          <div className="requirment">
            <img src={reqImage} alt="checked image" />
            <p>{job.requirement2}</p>
          </div>
          <div className="requirment">
            <img src={reqImage} alt="checked image" />
            <p>{job.requirement3}</p>
          </div>
        </ul>
      </div>

      <div className="applyDiv">
        <button className="apply" onClick={apply}>
          {didApply ? "Cancel" : "Apply"}
        </button>
      </div>

      <Toaster />
    </div>
  );
}
