import React from "react";
import style from './SearchPopup.module.css';

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
    <section key={`${type}-section`} className={style.searchPopupSection}>
      <span>
        {input ? type[0].toUpperCase() + type.slice(1) : `Popular ${type}`}
      </span>
      {cards}
    </section>
  );
};

export default SearchPopupSection;
