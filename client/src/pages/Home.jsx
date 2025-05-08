import React, { useState } from 'react';
import Header from '../components/Header.jsx';
import JobDisplay from '../components/JobDisplay.jsx';

export default function Home() {
  
  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header category={category} setCategory={setCategory}/>
      <JobDisplay category={category}/>
    </div>
  )
}