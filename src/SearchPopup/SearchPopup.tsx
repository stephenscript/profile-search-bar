import { useState } from "react";
import "./SearchPopup.css";
import { octothorp, letterT } from "../assets/svgs";

type SectionKeys = "Mentors" | "Topics" | "Articles";

const sections: Record<SectionKeys, JSX.Element> = {
  Mentors: <h1>1</h1>,
  Topics: <h1>2</h1>,
  Articles: <h1>3</h1>,
};

function SearchPopup() {
  const sectionElements: JSX.Element[] = Object.entries(sections).map(
    ([sectionKey, sectionValue]) => (
      <div key={sectionKey}>
        <h1>{sectionKey}</h1>
        {sectionValue}
      </div>
    )
  );

  return <div className="popup">{sectionElements}</div>;
}

export default SearchPopup;
