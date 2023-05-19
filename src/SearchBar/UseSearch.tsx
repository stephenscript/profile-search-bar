import { useState, useRef, useEffect } from "react";
import algoliasearch, { SearchClient } from "algoliasearch/lite";

const search = async (
  clients: { name: string; client: any }[],
  searchTerm: string
) => {
  const results: { [key: string]: any } = {};
  try {
    for (const { name, client } of clients) {
      const res = await client.search([searchTerm]);
      results[name] = res.hits;
    }
    return results;
  } catch (err) {
    console.log(err);
  }
};

export function useSearch() {
  const algolia = useRef<any>(
    algoliasearch(
      import.meta.env.VITE_ALGOLIA_ID,
      import.meta.env.VITE_ALGOLIA_API_KEY
    )
  );

  const mentorsClient = useRef<SearchClient | null>(
    algolia.current?.initIndex("production_user_profiles")
  );
  const topicsClient = useRef<SearchClient | null>(
    algolia.current?.initIndex("production_topics")
  );
  const articlesClient = useRef<SearchClient | null>(
    algolia.current?.initIndex("production_content_articles")
  );

  const clients = [
    { name: "mentors", client: mentorsClient.current },
    { name: "topics", client: topicsClient.current },
    { name: "articles", client: articlesClient.current },
  ];

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setResults] = useState<{ [key: string]: any } | null>(
    null
  );

  useEffect(() => {
    search(clients, searchTerm).then((res = {}) => {
      setResults(res);
    });
  }, [searchTerm]);

  return [searchResults, setSearchTerm];
}
