import styles from "./SearchResultCard.module.css";
import { octothorp, letterT } from "../assets/svgs";
import { Profile } from "../types";

const cloudinaryUrlPrefix =
  "https://res.cloudinary.com/mentorcam/image/upload/c_fill,f_auto,g_auto:face,h_800,w_800/v1/";

const getProfileImage = (profile: Profile) => {
  switch (profile.type) {
    case "user-profiles":
      return (
        <img
          src={cloudinaryUrlPrefix + profile.trending_image}
          className={styles.searchResultCardPic}
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
      const profile2 = profile.credentials.split(",");
      return (
        <div>
          {profile2[0]},<br></br>
          <div>{profile2[1]}</div>
        </div>
      );
    case "topics":
      return profile.length + " mentors";
    case "content-articles":
      if (!profile.topics) return;
      return profile.topics[0].name;
  }
};

function SearchResultCard({ profile }: { profile: Profile }) {
  return (
    <>
      <div className={styles.searchResultCard}>
        <div
          className={styles.searchResultCardPic}
          style={
            profile.type !== "user-profiles"
              ? { outline: "1px solid rgb(227, 227, 227)" }
              : { outline: "none" }
          }
        >
          {getProfileImage(profile)}
        </div>
        <div className={styles.searchResultCardContent}>
          <pre className={styles.profileName}>
            {profile.name || profile.title}
          </pre>
          <pre className={styles.profileSubtext}>{getSubtext(profile)}</pre>
        </div>
      </div>
    </>
  );
}

export default SearchResultCard;
