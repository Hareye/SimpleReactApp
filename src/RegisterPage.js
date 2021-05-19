import React, { useState } from "react";

const axios = require("axios");

// Don't need this page unless I decide to implement my own account system

function RegisterPage() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCPass] = useState("");

  const registerHandler = () => {
    if (user === "" || email === "" || pass === "" || cpass === "") {
      console.log("Empty field.");
    } else {
      console.log(user);
      console.log(email);
      console.log(pass);
      console.log(cpass);
    }
  };

  const keyHandler = (e) => {
    if (e.target.className === "user-register") {
      setUser(e.target.value);
    } else if (e.target.className === "email-register") {
      setEmail(e.target.value);
    } else if (e.target.className === "password-register") {
      setPass(e.target.value);
    } else if (e.target.className === "password-register-confirm") {
      setCPass(e.target.value);
    }
  };

  return (
    <div className="register-page">
      <div className="register-box">
        <div className="register-fields">
          <h1 className="register-title">Register</h1>
          <input
            className="user-register"
            placeholder="Username"
            onChange={keyHandler}
          />
          <input
            className="email-register"
            placeholder="Email"
            onChange={keyHandler}
          />
          <input
            className="password-register"
            type="password"
            placeholder="Password"
            onChange={keyHandler}
          />
          <input
            className="password-register-confirm"
            type="password"
            placeholder="Confirm Password"
            onChange={keyHandler}
          />
          <button className="create-button" onClick={registerHandler}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
