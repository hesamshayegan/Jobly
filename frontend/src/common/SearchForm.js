import React, { useState } from "react";
import "./SearchForm.css";

function SearchForm({ searchFor }) {
  // console.debug("SearchForm", "searchFor=", typeof searchFor);

  const [searchTerm, setSearchTerm] = useState("");

  /** Tell parent to filter */
  function handleSubmit(evt) {
    // take care of accidentally trying to search for just spaces
    evt.preventDefault();
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  /** Update form fields */
  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
      <div>
        <form className="search-form" onSubmit={handleSubmit}>
          <input              
              name="searchTerm"
              placeholder="Enter search term.."
              value={searchTerm}
              onChange={handleChange}
          />
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
  );
}

export default SearchForm;
