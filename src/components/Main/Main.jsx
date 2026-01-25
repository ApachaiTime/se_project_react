import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";
import { ItemCard } from "../ItemCard/ItemCard.jsx";
import { useContext } from "react";
import { getWeatherCondition } from "../../utils/weatherApi.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";

export default function Main({
  weatherData,
  children,
  cards,
  handleCardClick,
  onCardLike,
  card,
}) {
  const { currentTempUnit } = useContext(CurrentTemperatureUnitContext);
  const filteredClothes = cards.filter((item) => {
    return item.weather === getWeatherCondition(weatherData.temperature);
  });
  return (
    <main className="main">
      <div className="weather-info">
        <WeatherCard weatherData={weatherData} />
        {children}
      </div>
      <section className="main__section">
        <h2 className="main__title">
          Today is
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
                  onCardLike={onCardLike}
                  isLiked={card.isLiked}
                />
              ),
          )}
        </ul>
      </section>
    </main>
  );
}
