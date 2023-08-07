import React, { useState, useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import UserContext from '../profile/UserContext';
import SearchForm from '../common/SearchForm';
import JoblyApi from '../api/api';
import JobCard from './JobCard';
import "./Jobs.css"


const Jobs = () => {
    const [jobs, setJobs] = useState(null);
    const { currentUser, userInfoLoaded} = useContext(UserContext);

    useEffect(function getAllJobsOnMount() {
        console.debug("JobList useEffect getAllJobsOnMount");
        searchJobs();
      }, []);

    async function searchJobs(title) {
        let jobs = await JoblyApi.getAllJobs(title);
        setJobs(jobs);
    };


    if (!currentUser && userInfoLoaded) {
        return <Navigate replace to="./login" />
    }

    return (
        <div className="Jobs">
            {jobs && jobs.length ? (
                <>
                    <SearchForm searchFor={searchJobs} />
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
                </>
            ) : (
                <p className="lead">Sorry, no results were found!</p>
            )}
        </div>
    );
    
    

}

export default Jobs;