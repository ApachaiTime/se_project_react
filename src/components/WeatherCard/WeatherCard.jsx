import Cloudy from "../../assets/Cloudy.png";
import Thunderstorm from "../../assets/Thunderstorm.png";
import Sun from "../../assets/Sun.png";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";
import { useContext } from "react";

export default function WeatherCard({ weatherData }) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  const cloudyCondition = weatherData["condition"] === "Clouds";
  const rainyCondition = weatherData["condition"] === "Rain";

  return cloudyCondition === true ? (
    <div className="weather-card">
      <img
        className="weather-card__icon"
        src={Cloudy}
        alt="Cloudy conditions"
      />
      <p className="weather-card__temperature">
        {weatherData["temperature" + (currentTempUnit === "C" ? "C" : "")] +
          "°" +
          currentTempUnit}
      </p>
    </div>
  ) : rainyCondition === true ? (
    <div
      style={{
        backgroundColor: "rgba(108, 166, 199, 1)",
      }}
      className="weather-card"
    >
      <img
        className="weather-card__icon"
        src={Thunderstorm}
        alt="Rainy conditions"
      />
      <p className="weather-card__temperature">
        {weatherData["temperature" + (currentTempUnit === "C" ? "C" : "")] +
          "°" +
          currentTempUnit}
      </p>
    </div>
  ) : (
    <div className="weather-card">
      <img className="weather-card__icon" src={Sun} alt="" />
      <p className="weather-card__temperature">
        {weatherData["temperature" + (currentTempUnit === "C" ? "C" : "")] +
          "°" +
          currentTempUnit}
      </p>
    </div>
  );
}
