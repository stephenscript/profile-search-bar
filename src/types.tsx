export interface Profile {
  type: string;
  name: string;
  identifier: string;
  credentials: string;
  username: string;
  title: string;
  sort_index: number;
  topics?: { [key: string]: string }[];
  objectID: string;
  trending_image: string;
  trending_image_base64: string;
  length?: number;
}
export interface SearchPopupProps {
  searchResults: SearchResults;
  showResults: boolean;
  input: string;
}

export type SearchResults = { [key: string]: Profile[] } | null;
export type SearchSetter = (searchTerm: string) => void;
export type SearchCache = { [key: string]: SearchCache };
