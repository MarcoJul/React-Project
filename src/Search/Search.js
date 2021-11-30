import React, { useState } from "react";
import { ReactComponent as SearchIcon } from "./ICN_Search.svg";
// import { useMediaQuery } from "react-responsive";
import "./Search.css";

const Search = (props) => {
  const [isFixed, setIsFixed] = useState(false);

  const searchHandler = (event) => {
    props.onSearchQuote(event.target.value);
  };

  // const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const changeFixedSearch = () => {
    window.scrollY >= 104 ? setIsFixed(true) : setIsFixed(false);
  };

  window.addEventListener("scroll", changeFixedSearch);

  return (
    <div className="container">
      <div className={`search-bar ${isFixed ? "search-bar__fixed" : ""}`}>
        <input
          type="text"
          className="search-input"
          placeholder="Search through your quotes"
          onChange={searchHandler}
        />
        <SearchIcon className="search-icon" />
      </div>
    </div>
  );
};

export default Search;
