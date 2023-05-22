import React, { useEffect, useState } from "react";
import "./SearchResultCard.css";
import { octothorp, letterT } from "../assets/svgs";
import { Profile } from "../types";

const cloudinaryUrlPrefix =
  "https://res.cloudinary.com/mentorcam/image/upload/c_fill,f_auto,g_auto:face,h_800,w_800/v1/";

const getProfileImage = (profile) => {
  switch (profile.type) {
    case "user-profiles":
      return (
        <img
          src={cloudinaryUrlPrefix + profile.trending_image}
          className="search-result-card-pic"
        />
      );
    case "topics":
      return octothorp;
    case "content-articles":
      return letterT;
  }
};

const getSubtext = (profile: Profile) => {
  switch (profile.type) {
    case "user-profiles":
      return profile.credentials.split(",").join(",\n");
    case "topics":
      return profile.length + ' mentors';
    case "content-articles":
      return profile.topics[0].name;
  }
};

function SearchResultCard({ profile }: { profile: Profile }) {
  return (
    <>
      <div className="search-result-card">
        <div className="search-result-card-pic" style={profile.type !== 'user-profiles' ? {outline: '1px solid rgb(227, 227, 227)'} : {outline: 'none'}}>{getProfileImage(profile)}</div>
        <div className="search-result-card-content">
          <pre id="profile-name">{profile.name || profile.title}</pre>
          <pre id="profile-subtext">{getSubtext(profile)}</pre>
        </div>
      </div>
    </>
  );
}

export default SearchResultCard;
