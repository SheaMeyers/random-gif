# Random Gif

## App Architecture

I used `create-react-app` to generate the initial code.

All of the app related code can be found in the `src` folder.  Here you can find `App.tsx` which is the main component rendered by `ReactDOM.render` in `index.tsx`.
Within `src` there are four other folders.

- `components` - Contains components that could be reused
- `css` - Contains the css code for styling the app
- `modals` - Contains the modal which displays a selected gif to the user
- `tests` - Contains unit tests for the app

I used this architecture as it is similar to the architecture you get when using `create-react-app` while also keeping similar files in clear directories.

## Libraries used

- [axios](https://www.npmjs.com/package/axios): I prefer using this over `fetch`, though `fetch` could have been used 
- [MUI](https://www.npmjs.com/package/@mui/material) and [Material Icons](https://www.npmjs.com/package/@mui/icons-material): I like using this library as I find the components are easy to use and aesthetically pleasing
- [react-modal](https://www.npmjs.com/package/react-modal): I used this to display the gif that a user selects (Fig 3)

## React Modal vs React Router

For Figure 3 I felt that React Modal gives a better user experience than redirecting to a new page.  I could have used react router and 
redirected the user to a new page, and this likely would have been better for a mobile application, but for a web application I felt 
react modal is better.

## Usage of 'any'

Ideally I wouldn't use `any` when using TypeScript but I felt creating custom types would distract from the rest of the assignment and since
it mentioned JavaScript could be used I felt in this instance it would be okay to use `any`.

### `npm start`

Will run the program. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Runs the test suite.  There are a few tests to test the functionality of the app in the `tests` directory
