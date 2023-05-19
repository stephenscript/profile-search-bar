import { useState, useRef, useEffect } from "react";
import { useSearch } from './UseSearch';

 import "./SearchBar.css";
import SearchPopup from "../SearchPopup/SearchPopup";
import { magnifyingGlass, xButton } from "../assets/svgs";
// const getProfiles = async (client: Client, setMentors: ([]) => void, input) => {
//   try {
//     const res = await client.search([input]);
//     const hits = res.hits.map((hit: any) => {
//       return (
//         <>
//           <div key={hit.ObjectID}>
//             <h3>{hit.name}</h3>
//             <h4>{hit.credentials}</h4>
//           </div>
//         </>
//       );
//     });
//     setMentors(hits);
//   } catch (err) {
//     console.log(err);
//   }
// };

function SearchBar() {
  // const algolia = useRef(
  //   algoliasearch(
  //     import.meta.env.VITE_ALGOLIA_ID,
  //     import.meta.env.VITE_ALGOLIA_API_KEY
  //   )
  // );
  // const mentorsIndex = useRef(
  //   algolia.current.initIndex("production_user_profiles")
  // );
  // const topicsIndex = useRef(algolia.current.initIndex("production_topics"));
  // const articlesIndex = useRef(
  //   algolia.current.initIndex("production_content_articles")
  // );
  const [input, setInput] = useState("");
  // const [mentors, setMentors] = useState([]);
  // const [topics, setTopics] = useState([]);
  // const [articels, setArticles] = useState([]);
  const [searchResults, setSearchTerm] = useSearch();

  useEffect(() => {
    if (!input.length) return;
    const id = setTimeout(
      () => setSearchTerm(input),
      500
    );
    return () => clearTimeout(id);
  }, [input]);
  console.log(searchResults)
  return (
    <>
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
      <SearchPopup />
    </>
  );
}

export default SearchBar;
