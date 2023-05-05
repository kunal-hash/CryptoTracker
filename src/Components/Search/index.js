import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import "./styles.css"

function Search({search,onSearchChange}) {
  return (
    <div className="search-flex">
      <SearchRoundedIcon className="search-icon"></SearchRoundedIcon>
      <input type="search" className="search-input" placeholder="search" value={search} onChange={(e)=>{onSearchChange(e)}}></input>
    </div>
  );
}

export default Search;
