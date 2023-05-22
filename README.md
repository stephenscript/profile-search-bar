# Profile Search Bar

A responsive search bar that interacts with the Algolia and Cloudinary API to present relevant results to the user

## Stack

- Vite
- React
- TypeScript
## Features

- Custom Hook UseSearch()
  - Usage:
    ```js
    const [searchResult, setSearchTerm] = useSearch(SearchCache);
    /*
    // accepts a cache object as argument
    // returns searchResult<Object> and setSearchTerm<Setter>
    */
    ```
  - Handles queries to Algolia's API and caches previously searched values
- CSS Modules
  - provides consistent and reliable styling
- Modular code structure
  - makes adding and removing search sections and new search cards simple
  
  ## Author

  - [Stephen Rivas](https://stephenrivas.com)