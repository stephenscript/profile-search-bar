import { useState } from "react";
import "./SearchBar.css";
import SearchPopup from "../SearchPopup/SearchPopup";
import { magnifyingGlass, xButton } from "../assets/svgs";

function SearchBar() {
  return (
    <>
      <div className="bar">
        <input id="search" />
        {magnifyingGlass}
        {xButton}
      </div>
      <SearchPopup />
    </>
  );
}

export default SearchBar;
