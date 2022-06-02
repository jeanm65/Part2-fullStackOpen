import React, { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ country }) => {
  const [weatherTemperature, setWeatherTemperature] = useState("");
  const [weatherWind, setWeatherWind] = useState("");
  const [weatherIcon, setWeatherIcon] = useState("");
  const [error, setError] = useState("");
  const apiKey = process.env.REACT_APP_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}`;

  useEffect(() => {
    const fn = async () => {
      try {
        const res = await axios.get(url);
        const weatherData = res.data;
        setWeatherTemperature(weatherData.main);
        setWeatherWind(weatherData.wind);
        setWeatherIcon(weatherData.weather[0]);
        console.log(weatherData);
      } catch (error) {
        setError(error.message);
      }
    };
    fn();
  }, [country.capital, url]);

  return (
    <>
      Weather in {country.capital} <br />
      <br />
      temperature : {Math.floor(weatherTemperature.temp - 273)} ° Celcius <br />
      <br />
      <img
        src={`http://openweathermap.org/img/wn/${weatherIcon.icon}@2x.png`}
        alt=""
      />
      <br />
      wind {weatherWind.speed} m/s
      {error && <span>{error}</span>}
    </>
  );
};

export default Weather;
