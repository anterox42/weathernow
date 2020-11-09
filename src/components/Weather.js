import React, { useEffect, useState } from "react";
import Loader from "./Loader.js";

const KEY = "85941f8c6ba2d488f65cdccdbf92add4";

const Weather = () => {
  const [temp, setTemp] = useState("loading");
  const [lon, setLon] = useState(null);
  const [lat, setLat] = useState(null);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    // Getting current location
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        setLon(position.coords.longitude);
        setLat(position.coords.latitude);
      },
      (error) => console.log(error.message)
    );
  }, []);

  useEffect(() => {
    // Getting weather from api
    if (lat != null && lon != null) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setTemp(Math.floor(data.main.temp));
          setCity(data.name);
          setWeather(data.weather[0].main);
          setIcon(data.weather[0].icon);
        });
    }
  }, [lat, lon]);


  if (lon === null || lat === null || temp === null || city === null) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <p style={{textAlign: "center", marginTop: "30vh"}}>
        <img
        src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
        alt={weather}
        />
      </p>
      <h1 style={{textAlign: "center"}}>{temp}° C</h1>
      <p style={{textAlign: "center"}}>{city}</p>
    </div>
  );
};

export default Weather;
