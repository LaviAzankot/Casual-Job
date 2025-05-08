import React, { useContext } from 'react';
import '../../public/styles/applies.css';
import '../../public/styles/jobDisplay.css';
import { StoreContext } from '../context/StoreContext';
import JobItem from '../components/JobItem';


export default function Applies() {
    const { applies } = useContext(StoreContext);

    return (
        <div className="jobDisplay">
            <p className="message">Applies are shown here!</p>
            <div className="jobItems">
                {    applies.map((job, index) => {
                        return (
                            <JobItem key={index} type={"apply"} id={job.id} user_id={job.user_id} description={job.description} image_url={job.image_url} hardness={job.hardness} price={job.price} time={job.time}/>
                        )
                    })}
            </div>
        </div>
    )
} 