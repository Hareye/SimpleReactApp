import React from "react";
//import { NavLink } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";
import "./index.css";

// Don't need loginHandler or input fields unless I decide to implement my own account system

require("dotenv").config();
const axios = require("axios");
const cookies = new Cookies();

function LoginPage() {
  /*
  const loginHandler = (e) => {
    axios.get("http://localhost:3001/users").then(
      (res) => {
        console.log("Logging server response...");
        console.log(res);
      },
      (error) => {
        console.log(error);
      }
    );
  };
  */

  const checkCookies = (e) => {
    if (cookies.get("accessToken") === undefined) {
      console.log("it is undefined");
    } else {
    }
    //console.log(cookies.get("test"));
  };

  const googleHandler = (e) => {
    //console.log(e);
    axios
      .post("http://localhost:3001/google-login", {
        token: e.tokenId,
        googleId: e.googleId,
      })
      .then(
        (res) => {
          var data = res.data;
          console.log("Account Login: " + data.email);
          cookies.set("accessToken", e.accessToken);
        },
        (error) => {
          console.log(error);
        }
      );
  };

  checkCookies();

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="input-fields">
          <h1 className="login-title">Login</h1>
          {/*
          <input className="user-input" placeholder="Username" />
          <input
            className="password-input"
            type="password"
            placeholder="Password"
          />
          <button className="login-button" onClick={loginHandler}>
            Login
          </button>
          */}
          <GoogleLogin
            className="google-login"
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            buttonText="Sign in with Google"
            onSuccess={googleHandler}
            onFailure={googleHandler}
          />
          {/*
          <NavLink className="register-button" to="/register">
            Register
          </NavLink>
          */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
