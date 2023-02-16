import React, { useEffect, useState } from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import "./App.css";
import {
  useScrollTrigger,
  Slide,
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Typography,
  IconButton,
} from "@mui/material";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";

const navButton: {
  paddingX: string;
} = { paddingX: "1vw" };

interface Error {
  error: boolean;
  message: string;
}

interface MyProps {
  removeCookie: Function;
}

function App(props: MyProps) {
  const [apiError, setApiError] = useState<Error>({
    error: false,
    message: "",
  });

  //By default it has the window as Target and threshold = 100, and it
  //change the trigger value when the vertical scroll strictly crosses this threshold (exclusive).
  //returned value is used to trigger the <Slide>.
  const trigger = useScrollTrigger();

  //Fetching data from the "fakestoreapi"
  //This function will be called inside the useEffect hook, every time the user load the page
  const getCarts = async () => {
    const response = await fetch("https://fakestoreapi.com/carts");
    console.log("response", response);
    // response.ok returns true if the request was successful (status in the range 200-299) and false if it was not successful.
    if (response.ok === false) {
      setApiError({
        error: true,
        message: `${response.status} - Something went wrong, please try again`,
      });
      return;
    }

    // status 204 = No Content
    if (response.status === 204) {
      setApiError({
        error: true,
        message: `No carts available`,
      });
      return;
    }

    const parse = await response.json();

    //add redux and encapsulation
    return;
  };

  useEffect(() => {
    getCarts();
  }, []);

  return (
    <>
      <BrowserRouter>
        <img src="/patternpad.svg" alt="colorful shapes" />
        {/* If "in" = true, the component will transition in.  */}
        <Slide in={!trigger}>
          <AppBar color="transparent">
            <Toolbar
              component="nav"
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                <LocalMallOutlinedIcon fontSize="large" />
                <Typography variant="h4">Type-Store</Typography>
              </Box>
              <Box>
                <Link to="/home">
                  <Button variant="text" sx={navButton}>
                    Home
                  </Button>
                </Link>
                <Link to="/products">
                  <Button variant="text" sx={navButton}>
                    Products
                  </Button>
                </Link>
                <Link to="/carts">
                  <Button variant="text" sx={navButton}>
                    Carts
                  </Button>
                </Link>
                <Link to="/customers">
                  <Button variant="text" sx={navButton}>
                    Customers
                  </Button>
                </Link>
              </Box>
              <IconButton
                aria-label="logout"
                onClick={() =>
                  props.removeCookie("TypeStore", {
                    user: "username",
                    auth: true,
                  })
                }
              >
                <ExitToAppOutlinedIcon fontSize="large" />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Slide>
        <Routes>
          <Route path="/">
            <Route path="home">I AM HOME</Route>
            <Route path="products">I AM products</Route>
            <Route path="carts">I AM carts</Route>
            <Route path="customers">I AM customers</Route>
            {/* Route set to catch all URLs that we don't have explicit routes. */}
            <Route path="*">I AM *</Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
