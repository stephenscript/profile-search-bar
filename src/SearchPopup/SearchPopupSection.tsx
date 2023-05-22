import React from "react";

const SearchPopupSection = ({
  input,
  cards,
  type,
}: {
  input: string;
  cards: React.ReactNode[];
  type: string;
}) => {
  return (
    <section key={`${type}-section`} className="search-popup-section">
      <span>
        {input ? type[0].toUpperCase() + type.slice(1) : `Popular ${type}`}
      </span>
      {cards}
    </section>
  );
};

export default SearchPopupSection;
