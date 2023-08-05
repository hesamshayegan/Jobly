import React, { useState, useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../profile/UserContext";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import SearchForm from "../common/SearchForm";
import "./Companies.css";

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const { currentUser, userInfoLoaded } = useContext(UserContext);

    async function getCompanies(data) {
        let companies = await JoblyApi.getAllCompanies(data.search);
        setCompanies(companies);
    }

    useEffect(() => {
        async function fetchCompanies() {
            let companies = await JoblyApi.getAllCompanies();
            setCompanies(companies);
        }
        fetchCompanies();
    }, []);

    if (!currentUser && userInfoLoaded) {
        return <Navigate replace to="/login" />;
    }

    return (
        <div className="companies-container">
            <h1 className="page-title">Companies </h1>
            <SearchForm searchFunction={getCompanies} />
            <div className="company-list">
                {companies.map(company => (
                    <CompanyCard
                        key={company.handle}
                        name={company.name}
                        handle={company.handle}
                        description={company.description}
                        logoUrl={company.logoUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default Companies;

