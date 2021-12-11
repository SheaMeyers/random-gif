import React, { useReducer, useEffect } from "react";
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

function App() {
  const newGifInterval = 10000; // 10 seconds
  const gifSearchLimit = 10; // number of results

  const [state, dispatch] = useReducer(reducer, initialState);

  const gifComponent = (
    <DisplayGif src={state.src} title={state.title} rating={state.rating} />
  );

  // TODO Move to utils file?
  const getNewRandomGif = () => {
    axios
      .get(`https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`)
      .then((response) => dispatch({ ...response.data.data, type: "NEW_GIF" }))
      .catch((error) => console.log(error));
  };

  // TODO Move to utils file?
  const getSearchGifElements = async () => {
    if (state.searchText < 2) {
      return;
    }

    const result = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${state.searchText}&limit=${gifSearchLimit}`
    );
    const searchedGifs = result.data.data.map((obj: any, index: number) => {
      return (
        <img
          src={obj.images["480w_still"].url}
          height="200"
          width="250"
          alt={obj.title}
          onClick={() =>
            dispatch({
              type: "SET_MODAL_GIF",
              embed_url: obj.embed_url,
              title: obj.title,
              rating: obj.rating,
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
        displayGifComponent={gifComponent}
      />
    </div>
  );
}

export default App;
