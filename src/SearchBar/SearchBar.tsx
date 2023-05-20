import { useState, useRef, useEffect } from "react";
import { useSearch } from "./UseSearch";

import "./SearchBar.css";
import SearchPopup from "../SearchPopup/SearchPopup";
import { magnifyingGlass, xButton } from "../assets/svgs";

function SearchBar() {
  const [input, setInput] = useState("");
  const [searchResults, setSearchTerm] = useSearch();
  const [showResults, setShowResults] = useState(false);
  const [popupBlur, setPopupBlur] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(input), 500);
    return () => clearTimeout(id);
  }, [input]);

  return (
    <>
      <section
        className="search"
        onFocus={() => setShowResults(true)}
        onBlur={() => setShowResults(false)}
      >
        <div className="bar">
          <input
            id="search"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for mentors"
          />
          <div id="mag">{magnifyingGlass}</div>
          <div id="xb">{xButton}</div>
        </div>
        <SearchPopup searchResults={searchResults} showResults={showResults} />
      </section>
    </>
  );
}

export default SearchBar;
