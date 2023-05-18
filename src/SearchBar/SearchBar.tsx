import { useState, useRef, useEffect } from "react";
import "./SearchBar.css";
import SearchPopup from "../SearchPopup/SearchPopup";
import { magnifyingGlass, xButton } from "../assets/svgs";
import algoliasearch, {
  Client,
} from "https://cdn.jsdelivr.net/npm/algoliasearch@4.17.0/dist/algoliasearch-lite.esm.browser.js";

const getProfiles = async (client: Client, setMentors: ([]) => void, input) => {
  try {
    const res = await client.search([input]);
    console.log(res.hits);
    const hits = res.hits.map((hit: any) => {
      return (
        <>
          <div key={hit.ObjectID}>
            <h3>{hit.name}</h3>
            <h4>{hit.credentials}</h4>
          </div>
        </>
      );
    });
    setMentors(hits);
  } catch (err) {
    console.log(err);
  }
};

function SearchBar() {
  const algolia = useRef(
    algoliasearch(
      import.meta.env.VITE_ALGOLIA_ID,
      import.meta.env.VITE_ALGOLIA_API_KEY
    )
  );
  const mentorsIndex = useRef(
    algolia.current.initIndex("production_user_profiles")
  );
  const [input, setInput] = useState("");
  const [mentors, setMentors] = useState([]);

  useEffect(() => {
    if (!input.length) return;
    const id = setTimeout(
      () => getProfiles(mentorsIndex.current, setMentors, input),
      500
    );
    return () => clearTimeout(id);
  }, [input]);

  return (
    <>
      <div className="bar">
        <input
          id="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div id="mag">{magnifyingGlass}</div>
        <div id="xb">{xButton}</div>
      </div>
      {mentors}
      <SearchPopup />
    </>
  );
}

export default SearchBar;
