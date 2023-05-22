import "./App.css";
import SearchBar from "./SearchBar/SearchBar";
import { searchCache } from './searchCache';

function App() {
  return (
    <>
      <div id="App">
        <SearchBar searchCache={searchCache}/>
      </div>
    </>
  );
}

export default App;
