import React from "react";
import FreelancersDisplay from "../components/FreelancersDisplay";

export default function Home() {
  /*const [category, setCategory] = useState("All");
  <Header category={category} setCategory={setCategory}/> <JobDisplay category={category}/> */
  return (
    <div>
      <FreelancersDisplay />
    </div>
  );
}
