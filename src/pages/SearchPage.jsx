import React, { useEffect, useRef, useState } from "react";
import { Provider, useSelector, useDispatch, connect } from "react-redux";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { Link, useNavigate } from "react-router-dom";

import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  CardHeader,
} from "@mui/material";

import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";

// Define your action types
const SAVE_GIF = "SAVE_GIF";
const SET_SEARCH_QUERY = "SET_SEARCH_QUERY";
const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
const SET_TOTAL_PAGES = "SET_TOTAL_PAGES";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
// Define your initial state
const gifsPerPage = 10;

const SearchPage = () => {
  // State for controlling the alert visibility
  const [showAlert, setShowAlert] = React.useState(false);

  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = React.useState(false);

  // Accessing state values from the Redux store
  const searchResults = useSelector((state) => state.gifs.searchResults);
  const currentPage = useSelector((state) => state.gifs.currentPage);
  const totalPages = useSelector((state) => state.gifs.totalPages);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handler for navigating to the saved gifs page
  const handleSavedGifsClick = () => {
    navigate("/saved-gifs");
  };

  // Handler for navigating to the home page
  const handleHomeClick = () => {
    navigate("/");
  };

  // Handler for saving a gif
  const handleSaveGif = (gif) => {
    setShowAlert(true);

    // Dispatching an action to save the gif
    dispatch({ type: SAVE_GIF, gif });

    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  // Handler for performing a search
  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      dispatch({ type: SET_SEARCH_QUERY, searchQuery });
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=WnTEYVz8yJSXIH1ZF4mLgRF33Ey4oC1g`
      );
      const data = await response.json();
      console.log(
        `https://api.giphy.com/v1/gifs/search?q=${searchQuery}&api_key=WnTEYVz8yJSXIH1ZF4mLgRF33Ey4oC1g`
      );
      // Dispatching actions to update search results and pagination
      dispatch({ type: SET_SEARCH_RESULTS, searchResults: data.data });
      dispatch({
        type: SET_TOTAL_PAGES,
        totalPages: Math.ceil(data.pagination.count / gifsPerPage),
      });
      dispatch({ type: SET_CURRENT_PAGE, currentPage: 1 });
    } catch (error) {
      console.error("Error searching for gifs:", error);
    } finally {
      // setLoading(false);
    }
  };

  // Fetching initial gifs when the component mounts
  useEffect(() => {
    const fetchInitialGifs = async () => {
      try {
        const response = await fetch(
          "https://api.giphy.com/v1/gifs/trending?api_key=WnTEYVz8yJSXIH1ZF4mLgRF33Ey4oC1g"
        );
        const data = await response.json();
        // Dispatching actions to update search results and pagination
        dispatch({ type: SET_SEARCH_RESULTS, searchResults: data.data });
        dispatch({
          type: SET_TOTAL_PAGES,
          totalPages: Math.ceil(data.pagination.count / gifsPerPage),
        });
        dispatch({ type: SET_CURRENT_PAGE, currentPage: 1 });
      } catch (error) {
        console.error("Error fetching initial gifs:", error);
      }
    };

    fetchInitialGifs();
  }, []);

  // Handler for navigating to the next page
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      // Dispatching an action to update the current page
      dispatch({ type: SET_CURRENT_PAGE, currentPage: currentPage + 1 });
      // Delay for 0.5 seconds (500 milliseconds)
    }
  };

  // Handler for navigating to the previous page
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
      }, 1000);

      // Dispatching an action to update the current page
      dispatch({ type: SET_CURRENT_PAGE, currentPage: currentPage - 1 });
    }
  };

  // Handler for closing the alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  // Pagination calculations
  const startIndex = (currentPage - 1) * gifsPerPage;
  const endIndex = startIndex + gifsPerPage;
  const displayedGifs = searchResults.slice(startIndex, endIndex);

  return (
    <div style={styles.container}>
      <div>
        <AppBar position="static" style={styles.appBar}>
          <Snackbar
            open={showAlert}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              The gif is saved, check it out on xSaved Gifs page!
            </Alert>
          </Snackbar>

          <Toolbar>
            <TextField
              type="text"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search"
              style={styles.searchBox}
            />
            <SearchIcon style={styles.searchIcon} onClick={handleSearch} />
            <nav>
              <button style={styles.homeButton} onClick={handleHomeClick}>
                Home
              </button>
              <button style={styles.homeButton} onClick={handleSavedGifsClick}>
                Saved GIFs
              </button>
            </nav>

            <div style={styles.pagination}>
              <ArrowBackIosIcon
                style={styles.nextButton}
                variant="contained"
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
              />

              <Typography variant="body2">
                Page {currentPage} of {totalPages}
              </Typography>
              <ArrowForwardIosIcon
                style={styles.nextButton}
                variant="contained"
                disabled={currentPage >= totalPages - 1}
                onClick={handleNextPage}
              />
            </div>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2}>
          {displayedGifs.map((gif) => (
            <Grid item xs={2.4} key={gif.id}>
              <Card style={styles.card}>
                <Button color="inherit" onClick={() => handleSaveGif(gif)}>
                  <TurnedInNotIcon
                    style={styles.actionIcon}
                    variant="contained"
                  />{" "}
                  Save
                </Button>

                <CardMedia
                  component="img"
                  image={gif.images.fixed_height.url}
                  alt={gif.title}
                  style={styles.cardMedia}
                />
                <CardContent style={styles.cardContent}>
                  <Typography variant="body2" component="div">
                    {gif.title}
                  </Typography>
                  <div style={styles.userInfo}>
                    <PersonIcon style={styles.personIcon} />
                    <Typography variant="body2" color="textSecondary">
                      @{gif.username.length > 1 ? gif.username : "unknown user"}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
      {loading && (
        <div style={styles.loading}>
          <h1>Loading...</h1>
        </div>
      )}
    </div>
  );
};

export default SearchPage;

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    width: "100vw",
    flexDirection: "column",
  },
  loading: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    color: "#A6D0DD",
    marginLeft: "5px",
  },
  nextButton: {
    color: "white",
    marginBottom: "20px",
    marginLeft: "5px",
  },
  prevButton: {
    color: "white",
    marginBottom: "20px",
    marginLeft: "5px",
  },
  appBar: {
    marginBottom: "20px",
    backgroundColor: "#FF6969",
  },
  homeButton: {
    marginRight: "5px",
    backgroundColor: "white",
  },

  card: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  cardMedia: {
    objectFit: "cover",
    maxHeight: "120px",
    borderTop: "2px solid #FF6969",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderBottom: "2px solid #FF6969",
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "10px",
    paddingTop: "5px",
  },
  personIcon: {
    marginRight: "5px",
    color: "#FF6969",
    border: "1px solid gray",
    borderRadius: "25px",
  },
  saveButton2: {
    marginTop: "auto",
    border: "3px solid #A6D0DD",
    borderRadius: "5px",
  },
  actionIcon: {
    color: "#A6D0DD",
  },
  pagination: {
    display: "flex",
    marginLeft: "auto",
    marginTop: "20px",
  },
  searchBox: {
    marginRight: "20px",
    backgroundColor: "white",
  },
  searchIcon: {
    border: "1px solid white",
    borderRadius: "20px",
    marginRight: "5px",
    padding: "5px",
  },
};
