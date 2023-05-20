export interface Profile {
  type: string;
  name: string;
  identifier: string;
  credentials: string;
  username: string;
  title: string;
  sort_index: number;
  topics?: object[];
  objectID: string;
  trending_image: string;
  trending_image_base64: string;
  length?: number;
}
export interface SearchPopupProps {
  searchResults: Record<string, any>;
  showResults: boolean;
}
