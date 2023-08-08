import React, { useState, useContext, useEffect } from 'react';
import SearchForm from '../common/SearchForm';
import JoblyApi from '../api/api';
import JobCard from './JobCard';
import { Link, useLocation } from "react-router-dom";

import "./Jobs.css"
import { Button } from 'reactstrap';


const Jobs = () => {
    const [jobs, setJobs] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/jobs") {
            setSearchTerm("");
            searchJobs();
        }
    }, [location]);

    async function searchJobs(title) {
        let jobs = await JoblyApi.getAllJobs(title);
        setJobs(jobs);
    };


    return (
        <div className='jobs-container'>
            
                <SearchForm searchFor={searchJobs} />
               

            {jobs && jobs.length
                ? (
                    <div className="job-list">
                        {jobs.map(job => (
                        <JobCard
                            key={job.id}
                            id={job.id}
                            title={job.title}
                            salary={job.salary}
                            equity={job.equity}
                            companyName={job.companyName}
                        />
                        ))}
                    </div>
 
                ) : (
                    <p className="jobs-search-msg">Sorry, no results were found!</p>
                )}

                
                    
                
        </div>


        
    );
    
    

}

export default Jobs;
