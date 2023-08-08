import React, { useState, useContext, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import JoblyApi from "../api/api";
import UserContext from "../profile/UserContext";
import "./JobCard.css"


const JobCard = ({ id, title, salary, equity, companyName }) => {
    
    const { currentUser, applications, setApplications, userInfoLoaded } = useContext(UserContext);
    const [hasApplied, setHasApplied] = useState()

    useEffect(() => {
        if (userInfoLoaded) {

            setHasApplied(applications.includes(id))
        }

    }, [userInfoLoaded]);



    async function jobApply() {
        await JoblyApi.jobApply(currentUser.username, id);
        setApplications(prevIds => ([...prevIds, id]))
        setHasApplied(true);
    };

    return (
        <section>
          <div className="job-card-container"> 
            <Card className="job-card-custom">
              <CardBody className="JobCard">
                <div className="job-info">
                  <CardTitle className="title">
                    {title}
                  </CardTitle>
                  <p>{companyName}</p>
                  <div className="package">
                    {salary && <p>Salary: {'$'+formatSalary(salary)}</p>}
                    {equity !== undefined && <p>Equity: {equity}</p>}
                  </div>
                </div>
                <div className="job-button">
                  <button
                    onClick={jobApply}
                    disabled={hasApplied}
                  >
                    {hasApplied ? "Applied" : "Apply"}
                  </button>
                </div>
              </CardBody>
            </Card>
          </div>
        </section>
    )
}

function formatSalary(salary) {
    const digitsRev = [];
    const salaryStr = salary.toString();
  
    for (let i = salaryStr.length - 1; i >= 0; i--) {
      digitsRev.push(salaryStr[i]);
      if (i > 0 && i % 3 === 0) digitsRev.push(",");
    }
  
    return digitsRev.reverse().join("");
}
  

export default JobCard;