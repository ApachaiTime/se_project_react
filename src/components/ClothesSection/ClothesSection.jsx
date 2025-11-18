import "./ClothesSection.css";
import { ItemCard } from "../ItemCard/ItemCard";
import { getWeatherCondition } from "../../utils/weatherApi";
export default function ClothesSection({
  cards,
  handleCardClick,

  handleOpenAddGarmentModal,
}) {
  return (
    <>
      <span className="clothes__options">
        <p className="clothes__text">Your items</p>
        <button
          className="clothes__add__btn"
          onClick={handleOpenAddGarmentModal}
        >
          + Add new
        </button>
      </span>

      <ul
        className="item-cards__container"
        style={{
          marginLeft: "auto",
          paddingTop: "16px",
          maxWidth: "1350px",
          justifyContent: "flex-end",
        }}
      >
        {cards.map(
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
    </>
  );
}
