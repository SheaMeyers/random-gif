import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <iframe src="https://giphy.com/embed/IdZL90nzpBn362PNN0" title="random-gif" width="480" height="270" frameBorder="0"/>
      <div className="Gif-Info">
        <div>
          <p><b>Title</b></p>
          <p>GIF by NBA</p>
        </div>
        <div>
          <p><b>Rating</b></p>
          <p>{'g'.toUpperCase()}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
