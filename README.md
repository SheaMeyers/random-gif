# Random Gif

## App Architecture

This was initially started using `create-react-app`.

All of the app related code can be found in the `src` folder.  Here you can find `App.tsx` which is the main component rendered by `ReactDOM.render` in `index.tsx`.
Within `src` there are four other folders.

- `components` - Contains components that could be reused
- `css` - Contains the css code for styling the app
- `modals` - Contains the modal which displays a selected gif to the user
- `tests` - Contains unit tests for the app

## Libraries used

- [axios](https://www.npmjs.com/package/axios): I prefer using this over `fetch`, though `fetch` could have been used 
- [MUI](https://www.npmjs.com/package/@mui/material) and [Material Icons](https://www.npmjs.com/package/@mui/icons-material): I like using this library as I find the components are easy to use and aesthetically pleasing
- [react-modal](https://www.npmjs.com/package/react-modal): I used this to display the gif that a user selects (Fig 3)
- [msw](https://www.npmjs.com/package/msw): Used to mock external requests for the unit tests

### `npm start`

Will run the program. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Runs the test suite.  There are a few tests to test the functionality of the app in the `tests` directory

## Live Demo

https://random-gif.sheameyers.com/
