import { useReducer, useEffect } from "react";
import axios from "axios";
import { giphyApiKey } from "./keys";
import DisplayGif from "./components/DisplayGif";
import SearchBar from "./components/SearchBar";
import DisplayGifModal from "./modals/DisplayGifModal";
import "./css/App.css";


const initialState = {
  shouldDisplayModalGif: false,
  isSearchingForGifs: false,
  searchText: "",
  src: "",
  title: "",
  rating: "",
  searchedGifs: [],
};


const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "NEW_GIF":
      return {
        ...state,
        src: action.embed_url,
        title: action.title,
        rating: action.rating,
      };
    case "SET_TEXT":
      return {
        ...state,
        searchText: action.searchText,
      };
    case "CLEAR_TEXT":
      return {
        ...state,
        searchText: "",
        searchedGifs: [],
      };
    case "SEARCH_TEXT_FOCUSED":
      return {
        ...state,
        isSearchingForGifs: true,
      };
    case "SEARCH_TEXT_UNFOCUSED":
      return {
        ...state,
        searchText: "",
        isSearchingForGifs: false,
      };
    case "SEARCHED_GIFS":
      return {
        ...state,
        searchedGifs: action.searchedGifs,
      };
    case "SET_MODAL_GIF":
      return {
        ...state,
        shouldDisplayModalGif: true,
        src: action.embed_url,
        title: action.title,
        rating: action.rating,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        shouldDisplayModalGif: false,
      };
    default:
      console.warn(`Reducer action ${action.type} did not match any cases`);
      return state;
  }
};


const App = () => {
  const newGifInterval = 10000; // 10 seconds
  const gifSearchLimit = 10; // number of results

  const [state, dispatch] = useReducer(reducer, initialState);

  const gifComponent = (
    <DisplayGif src={state.src} title={state.title} rating={state.rating} />
  );

  const getNewRandomGif = () => {
    return;
    axios
      .get(`https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`)
      .then((response) => dispatch({ ...response.data.data, type: "NEW_GIF" }))
      .catch((error) => console.log(error));
  };

  const getSearchGifElements = async () => {
    if (state.searchText < 2) {
      return;
    }

    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${state.searchText}&limit=${gifSearchLimit}`
    );
    const searchedGifs = response.data.data.map((result: any, index: number) => {
      return (
        <img
          src={result.images["480w_still"].url}
          height="200"
          width="250"
          alt={result.title}
          onClick={() =>
            dispatch({
              type: "SET_MODAL_GIF",
              embed_url: result.embed_url,
              title: result.title,
              rating: result.rating,
            })
          }
          key={index}
        />
      );
    });
    dispatch({ type: "SEARCHED_GIFS", searchedGifs });
  };

  const closeGifModal = () => dispatch({ type: "CLOSE_MODAL" });

  const handleSearchTextChange = (searchText: string) => {
    dispatch({ type: "SET_TEXT", searchText });
    getSearchGifElements();
  };
  const handleSearchCancelClick = () => dispatch({ type: "SEARCH_TEXT_UNFOCUSED" });
  const handleSearchFocus = () => dispatch({ type: "SEARCH_TEXT_FOCUSED" });
  const handleClearSearchText = () => dispatch({ type: "CLEAR_TEXT" });

  useEffect(() => {
    if (!state.isSearchingForGifs) {
      getNewRandomGif();
      const interval = setInterval(getNewRandomGif, newGifInterval);
      return () => clearInterval(interval);
    }
  }, [state.isSearchingForGifs]);

  return (
    <div className="App">
      <SearchBar
        displayCancelButton={state.isSearchingForGifs}
        searchText={state.searchText}
        handleOnFocus={handleSearchFocus}
        handleClearText={handleClearSearchText}
        handleSearchTextChange={handleSearchTextChange}
        handleSearchCancel={handleSearchCancelClick}
      />
      <br />
      {state.isSearchingForGifs ? (
        // Display search results
        <>
          <p>Search results</p>
          <p>{state.searchedGifs}</p>
        </>
      ) : (
        // No search text, display random gif
        <>
          <p>Random selected gif: </p>
          {gifComponent}
        </>
      )}
      <DisplayGifModal
        isOpen={state.shouldDisplayModalGif}
        handleModalClose={closeGifModal}
        title={state.title}
        displayGifComponent={gifComponent}
      />
    </div>
  );
}

export default App;
