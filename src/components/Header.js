import React, { useState } from "react";
import "../index.css";
import { NavLink } from "react-router-dom";

function Header() {
  const activeStyle = {
    color: "orange",
    backgroundColor: "rgba(0, 0, 0, 0.75)",
  };
  // Turn user into context(?), turn username into clickable dropdown menu
  // https://www.w3schools.com/howto/howto_js_dropdown.asp
  const [user, setUser] = useState("Guest");
  return (
    <div className="header">
      <nav className="links">
        <NavLink className="login-link" activeStyle={activeStyle} exact to="/">
          Login
        </NavLink>
        <NavLink
          className="weather-link"
          activeStyle={activeStyle}
          to="/weather"
        >
          Weather
        </NavLink>
        <NavLink
          className="calculator-link"
          activeStyle={activeStyle}
          to="/calculator"
        >
          Calculator
        </NavLink>
        <NavLink
          className="minesweeper-link"
          activeStyle={activeStyle}
          to="/minesweeper"
        >
          Minesweeper
        </NavLink>
      </nav>
      <p className="welcome">
        Welcome,
        <span className="user">{user}</span>
      </p>
    </div>
  );
}

export default Header;
