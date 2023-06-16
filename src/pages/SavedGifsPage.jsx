import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  AppBar,
  Toolbar,
  Button,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";

// Define the action type for removing a GIF
const REMOVE_GIF = "REMOVE_GIF";

const SavedGifsPage = () => {
  // Retrieve the saved gifs from the Redux store
  const savedGifs = useSelector((state) => state.gifs.savedGifs);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] = React.useState(false);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleRemoveGif = (gif) => {
    // Show the removal alert
    setShowAlert(true);
    // Dispatch the REMOVE_GIF action with the selected gif
    dispatch({ type: REMOVE_GIF, gif });
    // Hide the alert after a delay
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowAlert(false);
  };

  return (
    <div style={styles.container}>
      <div>
        <AppBar style={styles.appBar} position="static">
          <Snackbar
            open={showAlert}
            autoHideDuration={4000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              The gif is removed from your saved items!
            </Alert>
          </Snackbar>
          <Toolbar>
            <nav>
              <button style={styles.homeButton} onClick={handleHomeClick}>
                Home
              </button>
            </nav>
          </Toolbar>
        </AppBar>

        <Grid container spacing={2}>
          {savedGifs.map((gif) => (
            <Grid item xs={2.4} key={gif.id}>
              <Card style={styles.card}>
                <Button color="inherit" onClick={() => handleRemoveGif(gif)}>
                  <DeleteIcon style={styles.actionIcon} variant="contained" />{" "}
                  Remove
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
    </div>
  );
};

// CSS styles for the component
const styles = {
  actionIcon: {
    color: "#A6D0DD",
  },

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
  searchBox: {
    marginRight: "20px",
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
  pagination: {
    display: "flex",
    marginLeft: "auto",
    marginTop: "20px",
  },
  searchIcon: {
    border: "1px solid white",
    borderRadius: "20px",
    padding: "5px",
  },
};

export default SavedGifsPage;
