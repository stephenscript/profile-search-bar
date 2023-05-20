import { useState, useRef, useEffect } from "react";
import { useSearch } from "./UseSearch";

import "./SearchBar.css";
import SearchPopup from "../SearchPopup/SearchPopup";
import { magnifyingGlass, xButton } from "../assets/svgs";

const handleClose = (input, setInput, setShowResults) => {
  if (!input.length) {
    setShowResults(false)
  } else {
    setInput('');
  }
}

function SearchBar() {
  const [input, setInput] = useState("");
  const [searchResults, setSearchTerm] = useSearch();
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(input), 500);
    return () => clearTimeout(id);
  }, [input]);
  

  return (
    <>
      <div id="search-bar">
        <div className={showResults ? "bar bar-open" : "bar"}>
          <input
            id="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for mentors"
            onFocus={() => setShowResults(true)}
            autoComplete="off"
          />
          <div id="mag">{magnifyingGlass}</div>
          <div id="xb" onClick={() => handleClose(input, setInput, setShowResults)}>{showResults ? xButton : null}</div>
        </div>
        <SearchPopup searchResults={searchResults} showResults={showResults}/>
      </div>
      {showResults ? <div className="backdrop" onClick={() => setShowResults(false)}></div> : null}
    </>
  );
}

export default SearchBar;
