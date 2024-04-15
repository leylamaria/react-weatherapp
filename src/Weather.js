import React, { useState } from "react";
import axios from "axios";

export default function Weather() {
  const [loaded, setLoaded] = useState(false);
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState(" ");

  function displayWeather(response) {
    setLoaded(true);
    setWeather({
      temperature: Math.round(response.data.temperature.current),
      description: response.data.condition.description,
      humidity: response.data.temperature.humidity,
      wind: Math.round(response.data.wind.speed),
      icon: <img src={response.data.condition.icon_url} alt="Weather icon" />,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "445od433c4e95b2d074a20e8fb1cta30";
    let units = "metric";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }

  function searchCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input type="search" placeholder="Enter a city.." onChange={searchCity} />
      <input type="submit" value="Search" />
    </form>
  );

  if (loaded) {
    return (
      <div className="Weather">
        {form}
        <ul>
          <li>Temperature: {weather.temperature}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          {weather.icon}
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
