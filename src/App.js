import React from "react";
import WeatherApp from "./WeatherApp";
import Calculator from "./Calculator";
import Minesweeper from "./Minesweeper";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Header from "./components/Header";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route path="/weather" component={WeatherApp} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/minesweeper" component={Minesweeper} />
        <Route path="/register" component={RegisterPage} />
      </Switch>
    </div>
  );
}

export default App;
