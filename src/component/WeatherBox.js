import React from 'react';

const WeatherBox = ({ weather }) => {
  console.log('weather', weather);
  return (
    <div className="weather-box">
      <div>📍{weather?.name}</div>
      <h2>
        현재온도 : {weather?.main.temp}℃ /{' '}
        {(weather?.main.temp * 1.8 + 32).toFixed(2)}℉
      </h2>
      <h3>
        <img
          id="wicon"
          src={`http://openweathermap.org/img/w/${weather?.weather[0].icon}.png`}
          alt="Weather icon"
        />{' '}
        {weather?.weather[0].description}
      </h3>
      <h3>풍속 :{weather?.wind.speed}m/s</h3>
    </div>
  );
};

export default WeatherBox;
