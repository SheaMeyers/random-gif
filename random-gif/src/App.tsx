import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import SearchIcon from "@mui/icons-material/Search";
import { giphyApiKey } from "./keys";
import DisplayGifModal from "./GifModal";
import "./App.css";
import "./Modal.css";

const initialState = {
  displayModalGif: false,
  modalGif: "",
  searchedGifs: [],
  isSearchTextFocused: false,
  searchText: "",
  src: "",
  title: "",
  rating: "",
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
        isSearchTextFocused: true,
      };
    case "SEARCH_TEXT_UNFOCUSED":
      return {
        ...state,
        searchText: "",
        isSearchTextFocused: false,
      };
    case "SEARCHED_GIFS":
      return {
        ...state,
        searchedGifs: action.searchedGifs,
      };
    case "SET_MODAL_GIF":
      return {
        ...state,
        displayModalGif: true,
        modalGif: action.modalGif,
      };
    case "CLOSE_MODAL":
      return {
        ...state,
        displayModalGif: false,
        modalGif: "",
      };
    default:
      return state;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const newGifInterval = 10000; // 10 seconds

  const closeGifModal = () => dispatch({ type: "CLOSE_MODAL" });

  const getNewGif = () => {
    if (state.searchText) {
      return;
    }

    axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`)
      .then(response => dispatch({ ...response.data.data, type: 'NEW_GIF' }))
      .catch(error => console.log(error));
  };

  const getSearchGifs = async () => {
    if (state.searchText < 2) {
      return;
    }
    const result = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${state.searchText}&limit=10`
    );
    const searchedGifs = result.data.data.map((obj: any, index: number) => {
      return (
        <img
          src={obj.images["480w_still"].url}
          height="200"
          width="250"
          alt={obj.title}
          onClick={() => dispatch({ type: "SET_MODAL_GIF", modalGif: obj.embed_url })}
          key={index}
        />
      );
    });
    dispatch({ type: "SEARCHED_GIFS", searchedGifs });
  };

  useEffect(() => {
    getNewGif();
    const interval = setInterval(getNewGif, newGifInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <div>
        <TextField
          label="Search"
          variant="outlined"
          value={state.searchText}
          onFocus={() => dispatch({ type: "SEARCH_TEXT_FOCUSED" })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Icon>
                  <SearchIcon />
                </Icon>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {state.searchText && (
                  <Icon onClick={() => dispatch({ type: "CLEAR_TEXT" })}>
                    <CancelIcon />
                  </Icon>
                )}
              </InputAdornment>
            ),
          }}
          onChange={(event) => {
            dispatch({ type: "SET_TEXT", searchText: event.target.value });
            getSearchGifs();
          }}
        />
        <Button 
          variant="contained" 
          color="error"
          onClick={() => dispatch({ type: "SEARCH_TEXT_UNFOCUSED" })}
        >
            Cancel
        </Button>
      </div>
      <br/>
      {state.isSearchTextFocused ? (
        // Display search results
        <>
          <p>Search results</p>
          <p>{state.searchedGifs}</p>
        </>
      ) : (
        // No search text, display random gif
        <>
          <iframe
            src={state.src}
            title="random-gif"
            width="480"
            height="270"
            frameBorder="0"
          />
          <div className="Gif-Info">
            <div>
              <p>
                <b>Title</b>
              </p>
              <p>{state.title}</p>
            </div>
            <div>
              <p>
                <b>Rating</b>
              </p>
              <p>{state.rating.toUpperCase()}</p>
            </div>
          </div>
        </>
      )}
      <DisplayGifModal
        isOpen={state.displayModalGif}
        handleModalClose={closeGifModal}
        gifSrc={state.modalGif}
      />
    </div>
  );
}

export default App;
