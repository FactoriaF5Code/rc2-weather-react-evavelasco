import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [ciudad, setCiudad] = useState("");
  const [tiempoActual, setTiempoActual] = useState(null);
  const [pronostico, setPronostico] = useState(null);
  const apiKey = "e9cb673eaac24d789a5190431241201";
  const [weather, setWeather] = useState({
    city: "",
    country: "",
    temp: "",
    icon: "",
  });
  const getTiempoActual = async () => {
    try {
      const tiempoActualRespuesta = await axios.get(
        `http://api.weatherapi.com/v1/current.json?q=${ciudad}&key=${apiKey}`
      );

      const pronosticoRespuesta = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?q=${ciudad}&key=${apiKey}&days=5`
      );
      const weatherData = tiempoActualRespuesta.data.current;
      const pronosticoData = pronosticoRespuesta.data.forecast;

      setTiempoActual(weatherData);
      setPronostico(pronosticoData);
      setWeather({
        city: tiempoActualRespuesta.data.location.name,
        country: tiempoActualRespuesta.data.location.country,
        temp: weatherData.temp_c,
        icon: weatherData.condition.icon,
      });
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Ingrese la ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
      />
      <button onClick={getTiempoActual}>Tiempo Actual</button>
      {tiempoActual && pronostico && (
        <div className="body">
          <h2>Pronostico para {ciudad}</h2>
          <p>Temperatura:{tiempoActual.temp_c} ºC</p>
          <p>Humedad: {tiempoActual.humidity}%</p>
          <p>Presión Atmosférica: {tiempoActual.pressure_mb} mb</p>
          <p>Velocidad del Viento: {tiempoActual.wind_kph} km/h</p>

          <h3>Pronóstico a Corto Plazo</h3>
          {pronostico.forecastday.map((day) => (
            <div key={day.date}>
              <p>{day.date}</p>
              <img src={day.day.condition.icon}></img>
              <p>Temperatura Mínima: {day.day.mintemp_c} ºC</p>
              <p>Temperatura Máxima: {day.day.maxtemp_c} ºC</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Weather;
