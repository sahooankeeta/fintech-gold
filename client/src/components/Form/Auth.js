import React, { useState } from "react";

import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { signin, signup } from "../../actions";
import useStyles from "./styles";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const error = useSelector((state) => state.error);
  const isLoading = useSelector((state) => state.isLoading);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => setShowPassword(!showPassword);

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(form);
    if (isSignup) {
      dispatch(signup(form, history));
    } else {
      dispatch(signin(form, history));
    }
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper}>
        <div style={{ marginBottom: "20px" }}>
          <Typography component="h1" variant="h5">
            {isSignup ? "Sign up" : "Sign in"}
          </Typography>
          {error && <div>{error}</div>} {isLoading && <div>loading . . .</div>}
        </div>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2} style={{ margin: "0", width: "100%" }}>
            {isSignup && (
              <TextField
                name="name"
                label="Name"
                value={form.name}
                onChange={handleChange}
                autoFocus
                required
                fullWidth
                style={{ marginBottom: "10px" }}
              />
            )}
            <TextField
              value={form.email}
              name="email"
              label="Email Address"
              onChange={handleChange}
              required
              type="email"
              fullWidth
              style={{ marginBottom: "10px" }}
            />
            <TextField
              name="password"
              label="Password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              style={{ marginBottom: "10px" }}
            />
            {isSignup && (
              <TextField
                name="confirmPassword"
                label="Repeat Password"
                fullWidth
                style={{ marginBottom: "10px" }}
                onChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={classes.submit}
            style={{
              backgroundColor: "#212529",
              color: "white",
              border: "none",
              outline: "none",
            }}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>

          <Grid container justify="flex-end">
            <Grid item>
              <Button
                style={{
                  color: "#212529",
                }}
                onClick={switchMode}
              >
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
