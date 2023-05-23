import { useState, useEffect, useRef } from "react";
import { useSearch } from "./UseSearch";
import { SearchCache } from "../types";
import styles from "./SearchBar.module.css";
import SearchPopup from "../SearchPopup/SearchPopup";
import { magnifyingGlass, xButton, circle } from "../assets/svgs";

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
  const inputRef = useRef("");
  const [input, setInput] = useState("");
  const [searchResults, setSearchTerm] = useSearch(searchCache);
  const [showResults, setShowResults] = useState<boolean>(false);

  useEffect(() => {
    const id = setTimeout(() => setSearchTerm([input, inputRef]));
    return () => clearTimeout(id);
  }, [input]);

  return (
    <>
      <div className={styles.searchBar}>
        <div className={`${styles.bar} ${showResults ? styles.barOpen : ""}`}>
          <input
            className={styles.searchInput}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              inputRef.current = e.target.value;
            }}
            placeholder="Search for mentors"
            onFocus={() => setShowResults(true)}
            autoComplete="off"
          />
          <div className={styles.mag}>{magnifyingGlass}</div>
          <div
            className={styles.xb}
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
        <SearchPopup
          searchResults={searchResults}
          showResults={showResults}
          input={input}
        />
      </div>
      {showResults ? (
        <div
          className={styles.backdrop}
          onClick={() => setShowResults(false)}
        ></div>
      ) : null}
    </>
  );
}

export default SearchBar;
