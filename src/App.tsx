import { useReducer, useEffect } from "react";
import axios from "axios";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { giphyApiKey } from "./keys";
import reducer, { initialState } from "./reducer";
import DisplayGif from "./components/DisplayGif";
import SearchBar from "./components/SearchBar";
import DisplayGifModal from "./modals/DisplayGifModal";
import "./css/App.css";


const App = () => {
  const newGifInterval = 10000; // 10 seconds
  const gifSearchLimit = 10; // number of results

  const [state, dispatch] = useReducer(reducer, initialState);

  const gifComponent = (
    <DisplayGif
      src={state.src}
      url={state.url}
      title={state.title}
      rating={state.rating}
    />
  );

  const getNewRandomGif = () => {
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
    const searchedGifs = response.data.data.map((result: any) => {
        return (
          <img
            src={result.images["480w_still"].url}
            alt={result.title}
            className="Searched-Image"
            onClick={() =>
              dispatch({
                type: "SET_MODAL_GIF",
                embed_url: result.embed_url,
                bitly_url: result.bitly_url,
                title: result.title,
                rating: result.rating,
              })
            }
            key={result.embed_url}
          />
        );
      }
    );
    dispatch({ type: "SEARCHED_GIFS", searchedGifs });
  };

  const closeGifModal = () => dispatch({ type: "CLOSE_MODAL" });

  const handleSearchTextChange = (searchText: string) => {
    dispatch({ type: "SET_TEXT", searchText });
    getSearchGifElements();
  };
  const handleSearchCancelClick = () =>
    dispatch({ type: "SEARCH_TEXT_UNFOCUSED" });
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
          <div className="Search-Gifs">{state.searchedGifs}</div>
        </>
      ) : (
        // No search text, display random gif
        <Card sx={{ maxWidth: 600 }}>
          <CardContent>
            <p>Random selected gif: </p>
            {gifComponent}
          </CardContent>
        </Card>
      )}
      <DisplayGifModal
        isOpen={state.shouldDisplayModalGif}
        handleModalClose={closeGifModal}
        title={state.title}
        displayGifComponent={gifComponent}
      />
    </div>
  );
};

export default App;
