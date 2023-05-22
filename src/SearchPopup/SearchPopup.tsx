import React, { useEffect, useState } from "react";
import "./SearchPopup.css";
import { Profile, SearchPopupProps } from "../types";
import SearchResultCard from "../SearchResultCard/SearchResultCard";

function SearchPopup({ searchResults, showResults, input }: SearchPopupProps) {
  const [mentorCards, setMentorCards] = useState(null);
  const [topicCards, setTopicCards] = useState(null);
  const [articleCards, setArticleCards] = useState(null);

  useEffect(() => {
    setMentorCards(
      searchResults.mentors.map((mentor: Profile) => (
        <SearchResultCard key={mentor.objectID} profile={mentor} />
      ))
    );
    setTopicCards(
      searchResults.topics.map((topic: Profile) => (
        <SearchResultCard key={topic.objectID} profile={topic} />
      ))
    );
    setArticleCards(
      searchResults.articles.map((article: Profile) => (
        <SearchResultCard key={article.objectID} profile={article} />
      ))
    );
  }, [searchResults]);

  const mentorSection = searchResults.mentors.length ? (
    <section key="mentors-section" className="search-popup-section">
      <span>{input ? "Mentors" : "Popular mentors"}</span>
      {mentorCards}
    </section>
  ) : null;

  const topicSection = searchResults.topics.length ? (
    <section key="topics-section" className="search-popup-section">
      <div className="thin-divider"></div>
      <span>{input ? "Topics" : "Popular topics"}</span>
      {topicCards}
    </section>
  ) : null;

  const articleSection = searchResults.articles.length ? (
    <section key="articles-section" className="search-popup-section">
      <div className="thin-divider"></div>
      <span>{input ? "Articles" : "Popular Articles"}</span>
      {articleCards}
    </section>
  ) : null;

  const sections = [mentorSection, topicSection, articleSection].filter(
    (section) => section
  );

  return showResults ? (
    <>
      <div className="search-popup">
        <div className="thin-divider no-padding"></div>
        <div className="content">
          {sections.length ? (
            sections
          ) : (
            <span className="no-results">No results for "{input}"</span>
          )}
        </div>
      </div>
    </>
  ) : null;
}

export default SearchPopup;
