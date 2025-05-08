import React from "react";
import { jobRequirements } from "../../assets/assets.js";

export default function Requirement({ name, category, updateData, data }) {
  return category === "other" ? (
    <input placeholder="Other requirement" />
  ) : (
    <select name={name} onChange={updateData} value={data[name]} required>
      <option value="" disabled hidden>
        Choose requirement
      </option>
      {jobRequirements[category].map((requirement, index) => {
        return (
          <option key={index} value={requirement}>
            {requirement}
          </option>
        );
      })}
    </select>
  );
}
