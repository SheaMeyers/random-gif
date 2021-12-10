import React, { useReducer, useEffect } from "react";
import axios from "axios";
import Icon from "@mui/material/Icon";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { giphyApiKey } from "./keys";
import "./App.css";

const initialState = {
  src: "",
  title: "",
  rating: "",
};

const reducer = (_state: any, action: any) => {
  return {
    src: action.embed_url,
    title: action.title,
    rating: action.rating,
  };
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const newGifInterval = 10000; // 10 seconds

  const getNewGif = () => {
    axios.get(`https://api.giphy.com/v1/gifs/random?api_key=${giphyApiKey}`)
      .then(response => dispatch(response.data.data))
      .catch(error => console.log(error));
  };

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
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Icon>
                <SearchIcon />
              </Icon>
            </InputAdornment>
          ),
        }}
        onChange={(event) => console.log(event.target.value)}
      />
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
    </div>
  );
}

export default App;
