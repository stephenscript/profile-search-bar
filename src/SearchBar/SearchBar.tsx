import { useState, useEffect } from "react";
import { useSearch } from "./UseSearch";
import { SearchCache } from "../types";
import "./SearchBar.css";
import SearchPopup from "../SearchPopup/SearchPopup";
import { magnifyingGlass, xButton, circle } from "../assets/svgs";

// close popup if no input
const handleClose = (
  input: string,
  setInput: (arg0: string) => void,
  setShowResults: (arg0: boolean) => void
) => {
  if (!input.length) {
    setShowResults(false);
  } else {
    setInput("");
  }
};

function SearchBar({ searchCache }: SearchCache) {
  const [input, setInput] = useState("");
  const [searchResults, setSearchTerm] = useSearch(searchCache);
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => setSearchTerm(input), 0);
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
          <div
            className="xb"
            onClick={() => handleClose(input, setInput, setShowResults)}
          >
            {showResults ? (
              <>
                {circle}
                {xButton}
              </>
            ) : null}
          </div>
        </div>
        {showResults ? (
          <SearchPopup
            searchResults={searchResults}
            showResults={showResults}
            input={input}
          />
        ) : null}
      </div>
      {showResults ? (
        <div className="backdrop" onClick={() => setShowResults(false)}></div>
      ) : null}
    </>
  );
}

export default SearchBar;
