import React, { useContext } from 'react';
import "../../public/styles/header.css";
import { assets, jobCategories } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

export default function Header({ category, setCategory }) {

    function handleClick(event) {
        const jobsElement = document.getElementsByClassName("categories")[0];
        const direction = event.target.getAttribute("name");

        // Didn't reach the right end of the scroll bar
        if (direction == "right" && jobsElement.scrollWidth > jobsElement.scrollLeft + 100) {
            jobsElement.scrollLeft += 500; 
        // Didn't reach the left end of the scroll bar
        } else if (direction == "left" && 0 !== jobsElement.scrollLeft) {
            jobsElement.scrollLeft -= 500; 
        }

    }

    return (
        <div className="header">
            <img onClick={handleClick} name="left" className="left" src={assets.back} alt="back button"/>
            <div className="categories">
                { jobCategories.map((jobCategory, index) => {
                    return (
                        <div key={index} className={ category === jobCategory.name ? "category active" : "category"} onClick={() => category === jobCategory.name ? setCategory("All") : setCategory(jobCategory.name)}>
                            <img src={jobCategory.image} alt={jobCategory.name} />
                            <p>{jobCategory.name}</p>
                        </div>
                    )
                })}
            </div>
            <img onClick={handleClick} name="right" className="right" src={assets.next} alt="next button"/>
        </div>

    )
}
