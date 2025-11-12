import WeatherCard from "../WeatherCard/WeatherCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import "./Main.css";
import { ItemCard } from "../ItemCard/ItemCard.jsx";
import { getWeatherCondition } from "../../utils/weatherApi.js";
export default function Main({
  weatherData,
  children,
  cards,
  handleCardClick,
  hideWeather = false,
}) {
  const currentTempUnit = useContext(CurrentTemperatureUnitContext);
  const filteredClothes = cards.filter((item) => {
    return item.weather === getWeatherCondition(weatherData.temperature);
  });
  return (
    <main className="main">
      <div className="weather-info">
        {!hideWeather && <WeatherCard weatherData={weatherData} />}
        {children}
      </div>
      <section className="main__section">
        <h2 className="main__title">
          Today is{" "}
          {weatherData["temperature" + (currentTempUnit === "C" ? "C" : "")] +
            "°" +
            currentTempUnit}
          / You may want to wear;
        </h2>
        <ul className="item-cards__container">
          {filteredClothes.map(
            (card) =>
              card && (
                <ItemCard
                  key={card._id}
                  card={card}
                  handleCardClick={handleCardClick}
                />
              )
          )}
        </ul>
      </section>
    </main>
  );
}
