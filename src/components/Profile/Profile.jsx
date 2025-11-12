import { getWeatherCondition } from "../../utils/weatherApi";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";
import { ItemCard } from "../ItemCard/ItemCard";

export default function Profile({
  cards,
  handleCardClick,
  weatherData,
  handleOpenAddGarmentModal,
}) {
  const filteredClothes = cards.filter((item) => {
    return item.weather === getWeatherCondition(weatherData.temperature);
  });
  return (
    <div className="profile">
      <div className="profile__content">
        <SideBar />
        <span className="profile__header__items">
          <p className="profile__header__text">Your items</p>
          <button
            className="profile__header__btn"
            onClick={handleOpenAddGarmentModal}
          >
            + Add new
          </button>
        </span>
      </div>
      <ul
        className="item-cards__container"
        style={{
          marginLeft: "auto",
          paddingTop: "48px",
          justifyContent: "flex-end",
          maxWidth: "1500px",
        }}
      >
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
    </div>
  );
}
