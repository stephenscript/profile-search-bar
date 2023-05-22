import SearchBar from "./SearchBar/SearchBar";
import { searchCache } from "./searchCache";
import "./App.css";

function App() {
  return (
    <>
      <div id="App">
        <SearchBar searchCache={searchCache} />
      </div>
    </>
  );
}

export default App;
