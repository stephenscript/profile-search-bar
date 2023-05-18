import { useState } from "react";
import "./SearchBar.css";
import { magnifyingGlass, xButton } from "../assets/svgs";

function SearchBar() {
  return (
    <>
      <div className="bar">
        <input id="search" />
        <svg id="mag" width="19">{magnifyingGlass}</svg>
        <svg id="xb" width="16">{xButton}</svg>
      </div>
     
    </>
  );
}

export default SearchBar;
