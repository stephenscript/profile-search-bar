import { useState, useRef, useEffect, MutableRefObject } from "react";
import algoliasearch, { SearchIndex } from "algoliasearch/lite";
import { Profile, SearchResults, SearchSetter, SearchCache } from "../types";

const search = async (
  indices: Record<string, SearchIndex>,
  searchTerm: string,
  searchCache: SearchCache
) => {
  // return results from cache if present
  if (searchTerm in searchCache) {
    console.log("Profiles from cache");
    return searchCache[searchTerm];
  }
  // query algolia index and store in cache
  console.log("Profiles from algolia search");
  const results: { [key: string]: any } = {};
  try {
    for (const [name, index] of Object.entries(indices)) {
      const res = await index.search(searchTerm);
      // default to top 6 most popular results
      results[name] = searchTerm ? res.hits : res.hits.slice(0, 6);
    }
    return (searchCache[searchTerm] = results);
  } catch (err) {
    console.log(err);
  }
};

export function useSearch(
  searchCache: SearchCache,
  inputRef: MutableRefObject<string>
): [SearchResults, SearchSetter] {
  // initialize algolia client
  const algolia = useRef<any>(
    algoliasearch(
      import.meta.env.VITE_ALGOLIA_ID,
      import.meta.env.VITE_ALGOLIA_API_KEY
    )
  );

  // initialize algolia client indices
  const mentorsIndex = useRef<SearchIndex>(
    algolia.current?.initIndex("production_user_profiles")
  );
  const topicsIndex = useRef<SearchIndex>(
    algolia.current?.initIndex("production_topics")
  );
  const articlesIndex = useRef<SearchIndex>(
    algolia.current?.initIndex("production_content_articles")
  );

  // provide a label to each index
  const indices: Record<string, SearchIndex> = {
    mentors: mentorsIndex.current,
    topics: topicsIndex.current,
    articles: articlesIndex.current,
  };

  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setResults] = useState<{
    [key: string]: Profile[];
  } | null>(null);

  useEffect(() => {
    search(indices, searchTerm, searchCache).then((res = {}) => {
      if(searchTerm === inputRef.current) setResults(res);
    });
  }, [searchTerm]);

  return [searchResults, setSearchTerm];
}
