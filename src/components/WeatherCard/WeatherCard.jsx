import Cloudy from "../../assets/Cloudy.png";
import Thunderstorm from "../../assets/Thunderstorm.png";
import Sun from "../../assets/Sun.png";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import "./WeatherCard.css";
import { useContext } from "react";

export default function WeatherCard({ weatherData }) {
  const currentUnit = useContext(CurrentTemperatureUnitContext);
  const CloudyCondition = weatherData["condition"] === "Clouds";
  const RainyCondition = weatherData["condition"] === "Rain";
  const DayTime = weatherData["sunrise"];
  const NightTime = weatherData["sunset"];
  const CurrentTime = weatherData["time"];
  return CloudyCondition === true ? (
    <div className="weather-card">
      <img className="weather-card__icon" src={Cloudy} alt="" />
      <p className="weather-card__temperature">
        {weatherData["temperature" + (currentUnit === "C" ? "C" : "")] +
          "°" +
          currentUnit}
      </p>
    </div>
  ) : RainyCondition === true ? (
    <div
      style={{
        backgroundColor: "rgba(108, 166, 199, 1)",
      }}
      className="weather-card"
    >
      <img className="weather-card__icon" src={Thunderstorm} alt="" />
      <p className="weather-card__temperature">
        {weatherData["temperature" + (currentUnit === "C" ? "C" : "")] +
          "°" +
          currentUnit}
      </p>
    </div>
  ) : (
    <div className="weather-card">
      <img className="weather-card__icon" src={Sun} alt="" />
      <p className="weather-card__temperature">
        {weatherData["temperature" + (currentUnit === "C" ? "C" : "")] +
          "°" +
          currentUnit}
      </p>
    </div>
  );
}
