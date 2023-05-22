import React from "react";
import { Profile, SearchPopupProps } from "../types";
import SearchPopupSection from "./SearchPopupSection";
import SearchResultCard from "../SearchResultCard/SearchResultCard";
import styles from "./SearchPopup.module.css";

function SearchPopup({ searchResults, showResults, input }: SearchPopupProps) {
  if (!searchResults) return null;
  // only display sections with valid results
  const sectionsWithHits = ["mentors", "topics", "articles"].filter(
    (type) => searchResults[type].length
  );

  const sections = sectionsWithHits.map((type, index) => {
    const items = searchResults[type];
    // create card for every entry of section type
    const cards = items.map((item: Profile) => (
      <SearchResultCard key={item.objectID} profile={item}/>
    ));
    // create section with cards for each section type
    // adds divider if more than one section present
    return (
      <React.Fragment key={index}>
        {index > 0 && <div className={styles.thinDivider}></div>}
        <SearchPopupSection input={input} cards={cards} type={type} />
      </React.Fragment>
    );
  });

  return showResults ? (
    <>
      <div className={styles.searchPopup}>
        <div className={`${styles.thinDivider} ${styles.noPadding}`}></div>
        <div className={styles.content}>
          {sections.length ? (
            sections
          ) : (
            <span className={styles.noResults}>No results for "{input}"</span>
          )}
        </div>
      </div>
    </>
  ) : null;
}

export default SearchPopup;
