import "./App.css";
import React, { useState } from "react";

const weather_api = {
  key: "c6879e4d4de39af3f3b86b4582ab43c1",
  base: "https://api.openweathermap.org/data/2.5/",
};

function WeatherApp() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = (event) => {
    if (event.key === "Enter") {
      fetch(
        `${weather_api.base}weather?q=${query}&units=metric&APPID=${weather_api.key}`
      )
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "Febuary",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <div className="main">
      <div className="weather-app">
        <div
          className={
            typeof weather.main != "undefined"
              ? weather.main.temp > 16
                ? "app warm"
                : "app"
              : "app"
          }
        >
          <main>
            <div className="search-box">
              <input
                className="search-bar"
                type="text"
                placeholder="Search..."
                onChange={(e) => setQuery(e.target.value)}
                value={query}
                onKeyPress={search}
              />
            </div>
            {typeof weather.main != "undefined" ? (
              <div>
                <div className="location-box">
                  <div className="location">
                    {weather.name}, {weather.sys.country}
                  </div>
                  <div className="date">{dateBuilder(new Date())}</div>
                </div>
                <div className="weather-box">
                  <div className="temperature">
                    {Math.round(weather.main.temp)}°C
                  </div>
                  <div className="weather">{weather.weather[0].main}</div>
                </div>
              </div>
            ) : (
              ""
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default WeatherApp;
