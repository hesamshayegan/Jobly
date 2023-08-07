import { useContext } from "react";
import { useParams, Navigate} from "react-router-dom";
import { useState, useEffect } from "react";

import JoblyApi from "../api/api";
import Jobs from "../jobs/Jobs.js"
import UserContext from "../profile/UserContext";
import "./CompanyDetails.css"

const CompanyDetails = () => {

    const { handle } = useParams();
    const { currentUser, userInfoLoaded } = useContext(UserContext);
    const [company, setCompany] = useState(null)

    useEffect(() => {
        async function getCompany() {
            let company = await JoblyApi.getCompany(handle);
            setCompany(company);
            console.log(company)
        }
        getCompany();
    }, [handle]);


if (!currentUser && userInfoLoaded) {
    return <Navigate replace to="./login" />
} else {
    
    if (!company) return (
        <div> loading </div>);
    
    return (
        <div>
            <div className="company-detail">
                <h4>{company.name}</h4>
                <p>{company.description}</p>
                <Jobs jobs={company.jobs} companyJobs={company.jobs} />
            </div>
        </div>
    )
}

};

export default CompanyDetails;