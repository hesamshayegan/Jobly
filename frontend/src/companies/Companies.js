import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import "./Companies.css";
import { Link, useLocation } from "react-router-dom";


function CompanyList() {
  // console.debug("CompanyList");

  const [companies, setCompanies] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  
  
  useEffect(() => {
    if (location.pathname === "/companies") {
        setSearchTerm("");
        searchCompanies();
    }
  }, [location]);

  /** Triggered by search form submit; reloads companies. */
  async function searchCompanies(name) {
    let companies = await JoblyApi.getAllCompanies(name);
    setCompanies(companies);
    
  }

  

  return (

            <div className="companies-container">
              
                
              <SearchForm searchFor={searchCompanies} />
                  {companies && companies.length
                    ? (
                      <div className="company-list">  
                                           
                          {companies.map(c => (
                              <CompanyCard
                                  key={c.handle}
                                  handle={c.handle}
                                  name={c.name}
                                  description={c.description}
                                  logoUrl={c.logoUrl}
                              />
                          ))}
                        </div>
                    ) : (
                        <p className="companies-search-msg">Sorry, no results were found!</p>
                  )}

            </div>
      
  );
}

export default CompanyList;