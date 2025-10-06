import WeatherCard from "../WeatherCard/WeatherCard";
import "./Main.css";
import { ItemCard } from "../ItemCard/ItemCard.jsx";
import DefaultClothingItems from "../../utils/clothingItems.js";
import { getWeatherCondition } from "../../utils/weatherApi.js";
export default function Main({
  weatherData,
  children,
  cards,
  handleCardClick,
}) {
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
          Today is {weatherData.temperature}/ You may want to wear;
        </h2>
        <ul className="item-cards__container">
          {filteredClothes.map(
            (card) =>
              card && (
                <ItemCard
                  key={card.name}
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
