import { useState, useRef, useEffect } from "react";
import { useSearch } from "./UseSearch";

import "./SearchBar.css";
import SearchPopup from "../SearchPopup/SearchPopup";
import { magnifyingGlass, xButton, circle} from "../assets/svgs";

const handleClose = (input, setInput, setShowResults) => {
  if (!input.length) {
    setShowResults(false)
  } else {
    setInput('');
  }
}

const xButtonElement = () => {
  return (
    <>
    hi
    {xButton}
    <div className="circle"></div>
    </>
  )
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
          <div className="mag">{magnifyingGlass}</div>
          
          <div className="xb" onClick={() => handleClose(input, setInput, setShowResults)}>{showResults ? <>{circle}{xButton}</> : null}</div>
          
        </div>
        <SearchPopup searchResults={searchResults} showResults={showResults}/>
      </div>
      {showResults ? <div className="backdrop" onClick={() => setShowResults(false)}></div> : null}
    </>
  );
}

export default SearchBar;
