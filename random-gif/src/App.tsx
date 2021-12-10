import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from "@mui/icons-material/Search";
import { giphyApiKey } from "./keys";
import "./App.css";

const initialState = {
  searchedGifs: [],
  isSearchTextFocused: false,
  searchText: "",
  src: "",
  title: "",
  rating: "",
};

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'NEW_GIF':
      return {
        ...state,
        src: action.embed_url,
        title: action.title,
        rating: action.rating,
      };
    case 'SET_TEXT':
      return {
        ...state,
        searchText: action.searchText,
      }
    case 'CLEAR_TEXT':
      return {
        ...state,
        searchText: "",
      }
    case 'SEARCH_TEXT_FOCUSED': 
      return {
        ...state,
        isSearchTextFocused: true,
      }
    case 'SEARCH_TEXT_UNFOCUSED': 
      return {
        ...state,
        isSearchTextFocused: false,
      }
    case 'SEARCHED_GIFS':
      return {
        ...state,
        searchedGifs: action.searchedGifs
      }
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const newGifInterval = 10000; // 10 seconds

  const getNewGif = () => {
    axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`)
      .then(response => dispatch({type: 'NEW_GIF', ...response.data.data}))
      .catch(error => console.log(error));
  };

  const getSearchGifs = async () => {
    if (state.searchText < 2) {
      return;
    }

    const result = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=${giphyApiKey}&q=${state.searchText}&limit=10`);
    const searchedGifs = result.data.data.map((obj: any, index: number) => {
      return <iframe
        src={obj.embed_url}
        title="random-gif"
        width="160"
        height="90"
        frameBorder="0"
        key={index}
      />;
    });
    dispatch({ type: 'SEARCHED_GIFS', searchedGifs })
  }

  useEffect(() => {
    getNewGif();
    const interval = setInterval(getNewGif, newGifInterval);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <TextField
        label="Search"
        variant="outlined"
        value={state.searchText}
        onFocus={() => dispatch({ type: 'SEARCH_TEXT_FOCUSED' })}
        onBlur={() => dispatch({ type: 'SEARCH_TEXT_UNFOCUSED' })}
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
        onChange={(event) =>{
          dispatch({ type: "SET_TEXT", searchText: event.target.value });
          getSearchGifs();
        }}
      />
      { 
      state.isSearchTextFocused ? 
      // Display search results
      <>
        <p>Search results</p>
        {state.searchedGifs}
      </>
      :
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
      }
    </div>
  );
}

export default App;
