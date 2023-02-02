import React from "react";
import "./Login.css";
import {
  Container,
  Paper,
  Box,
  TextField,
  Button,
  Alert,
  Typography,
} from "@mui/material";

export type MyProps = {
  setCookie: Function;
};

type MyState = {
  username: string;
  password: string;
  alert: {
    severity: any;
    errorMsg: string;
  };
};

enum SeverityLevels {
  Error = "error",
  Warning = "warning",
  Info = "info",
  Success = "success",
  Blank = "",
}

export default class Login extends React.Component<MyProps, MyState> {
  constructor(props: MyProps, state: MyState) {
    super(props);
    this.state = state;

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    // this.setError = this.setError.bind(this);
  }

  setError = (severity: SeverityLevels, msg: any) => {
    //adding ...this.state here will destructure the state object,
    //then I am able to add/modify more objects to the destructured object.
    //In order to take all of it and assign to the current state using this.setState
    this.setState({
      ...this.state,
      alert: {
        severity: severity,
        errorMsg: msg,
      },
    });
  };
  handleChange({
    target: { name, value },
  }: {
    target: { name: string; value: string };
  }) {
    this.setState({ ...this.state, [name]: value });
  }

  async handleClick(evt: { preventDefault: Function }) {
    evt.preventDefault();
    this.setError(SeverityLevels.Blank, "");
    const { username, password } = this.state;

    if (!username || !password) {
      this.setError(
        SeverityLevels.Warning,
        "Please fill out all fields before continuing"
      );
      return;
    }

    try {
      const response = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const parse = await response.json();
        if (parse.token) {
          this.props.setCookie(
            "TypeStore",
            { user: username, auth: true },
            { path: "/", maxAge: 1000 * 60 * 60 * 24, secure: true }
          );
          // eslint-disable-next-line no-restricted-globals
          location.reload();
          return;
        } else {
          // All success call are supposed to come back with a token property, if this do not happen,
          // we have an error, or something change on the API side, developers should be notified.
          this.setError(
            SeverityLevels.Error,
            "Ops! Something went wrong, please check your data and try again"
          );
          return;
        }
      } else {
        if (response.status === 401) {
          //401 Unauthorized response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource
          //Wrong username and/or password
          this.setError(
            SeverityLevels.Warning,
            "Ops! Wrong username and/or password, please check your data and try again"
          );
          return;
        } else {
          //All others api errors (400.., 500.., ...)
          this.setError(
            SeverityLevels.Error,
            "Ops! Something went wrong, please try again in a few seconds"
          );
          return;
        }
      }
    } catch (error) {
      this.setError(
        SeverityLevels.Error,
        "Ops! Something went wrong, please try again in a few seconds"
      );
      console.log("Login Auth API Error", error);
    }
  }

  render() {
    return (
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "flex-start",
          height: "100vh",
          flexWrap: "wrap",
          padding: "5%",
        }}
      >
        <img src="/patternpad.svg" alt="colorful shapes" />
        <Paper
          elevation={10}
          sx={{
            width: { xs: "90vw", sm: "70vw", md: "50vw" },
            p: 2,
            textAlign: "center",
            height: "fit-content",
          }}
        >
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Type-Store
          </Typography>
          <Box
            component="form"
            sx={{
              m: 1,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              alignContent: "center",
            }}
            autoComplete="off"
          >
            <TextField
              required
              id="outlined-required"
              placeholder="Username"
              type="username"
              name="username"
              sx={{ m: 1 }}
              onChange={this.handleChange}
            />
            <TextField
              required
              id="outlined-password-input"
              placeholder="Password"
              type="password"
              name="password"
              sx={{ m: 1 }}
              onChange={this.handleChange}
              data-testid="password"
            />
            <Button
              variant="contained"
              size="small"
              sx={{ m: 1 }}
              onClick={this.handleClick}
            >
              Login
            </Button>
            {this.state.alert ? (
              <Alert severity={this.state.alert.severity}>
                {this.state.alert.errorMsg}
              </Alert>
            ) : (
              <></>
            )}
          </Box>
        </Paper>
      </Container>
    );
  }
}
