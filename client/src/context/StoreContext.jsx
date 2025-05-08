import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export default function StoreContextProvider(props) {
    const [showLogin, setShowLogin] = useState(false);
    const [ userApplies, setUserApplies ] = useState({});
    const [ favouriteJobs, setFavouriteJobs ] = useState({});
    const [jobsList, setJobsList] = useState([]);
    const [token, setToken] = useState("");
    const api_port = 'http://localhost:3000'; 

    useEffect(() => {
        async function loadData() {
            await getAllJobs();
            // Check if user is already signed in
            const token = localStorage.getItem("token")
            if (token) {
                setToken(token);
            } 
        }

        loadData();
        
    }, [])

    useEffect(() => {
        console.log("Updated token from context:", token);
      }, [token]);

    async function getAllJobs(){
        const response = await axios.get(`${api_port}/api/jobs/getAll`);

        if (response.data.success) {
            setJobsList(response.data.data)
        }
    }

    function applyToJob(jobId){
        // Check if job is already in the array
        if (userApplies[jobId]) {
            setUserApplies((prev) => ({...prev, [jobId]: false}));
            //token && axios.post(`${api_port}/api/`)
            return {message: "Removed Succesfully!"};
        } else {
            setUserApplies((prev) => ({...prev, [jobId]: true}));
            return {message: "Applied Succesfully!"};
        }
    }

    function getApplies(){
        const appliedJobs = jobsList.filter(job => userApplies[job.id]);
        return appliedJobs;
    }

    function addFav(jobId){
        // Check if job is already in the array
        if (favouriteJobs[jobId]) {
            setFavouriteJobs((prev) => ({...prev, [jobId]: false}));
        } else {
            setFavouriteJobs((prev) => ({...prev, [jobId]: true}));
        }
    }

    function getFav(){
        const favJobs = jobsList.filter(job => favouriteJobs[job.id]);
        return favJobs;
    }

    const contextValue = {
        showLogin,
        setShowLogin,
        jobsList,
        applyToJob,
        applies: getApplies(),
        addFav,
        favourites: getFav(),
        api_port,
        setToken,
        token
    }

    return (
        <StoreContext.Provider value={contextValue}>
            { props.children }
        </StoreContext.Provider>
    )
}