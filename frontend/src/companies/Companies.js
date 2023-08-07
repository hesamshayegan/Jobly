import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import JoblyApi from "../api/api";
import CompanyCard from "./CompanyCard";
import "./Companies.css";


function CompanyList() {
  console.debug("CompanyList");

  const [companies, setCompanies] = useState(null);
  
  
  useEffect(function getCompaniesOnMount() {
    console.debug("CompanyList useEffect getCompaniesOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function search(name) {
    let companies = await JoblyApi.getAllCompanies(name);
    setCompanies(companies);
    console.log("state", setCompanies)
  }

  

  return (

            <div className="companies-container">
              
                
              <SearchForm searchFor={search} />
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
                        <p className="lead">Sorry, no results were found!</p>
                  )}
            </div>
      
  );
}

export default CompanyList;