const initialState = {
  savedGifs: [],
  currentPage: 1,
  totalPages: 1,
  searchQuery: "",
  searchResults: [],
};

const gifsPerPage = 10;

// Action types
const SAVE_GIF = "SAVE_GIF";
const REMOVE_GIF = "REMOVE_GIF";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";

// GIF reducer
const gifReducer = (state = initialState, action) => {
  
  switch (action.type) {
    case SAVE_GIF:
      const savedGifs = [...state.savedGifs, action.gif];
      return {
        ...state,
        savedGifs,
      };
    case REMOVE_GIF:
      
      const updatedSavedGifs = state.savedGifs.filter(
        (gif) => gif.id !== action.gif.id
      );
      return {
        ...state,
        savedGifs: updatedSavedGifs,
      };
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    case SET_SEARCH_RESULTS:
      const totalPages = Math.ceil(action.searchResults.length / gifsPerPage);
      return {
        ...state,
        searchResults: action.searchResults,
        totalPages,
      };
    case SET_TOTAL_PAGES:
      return {
        ...state,
        totalPages: action.totalPages,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: action.currentPage,
      };
    default:
      return state;
  }
};

export default gifReducer;
