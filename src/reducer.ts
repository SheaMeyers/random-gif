const initialState = {
  shouldDisplayModalGif: false,
  isSearchingForGifs: false,
  searchText: "",
  src: "",
  url: "",
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
        url: action.bitly_url,
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
        searchedGifs: [],
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
        url: action.bitly_url,
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

export { initialState };
export default reducer;
