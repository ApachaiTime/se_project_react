import "./ClothesSection.css";
import { ItemCard } from "../ItemCard/ItemCard";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";
export default function ClothesSection({
  cards,
  handleCardClick,

  handleOpenAddGarmentModal,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <ul className="clothes__list">
     <li> <span className="clothes__options">
        <p className="clothes__text">Your items</p>
        <button
          className="clothes__add__btn"
          onClick={handleOpenAddGarmentModal}
        >
          + Add new
        </button>
      </span>
      </li>
      {cards.map(
        (card) =>
          card.owner === currentUser._id && (
            <ItemCard
              key={card._id}
              card={card}
              handleCardClick={handleCardClick}
            />
          ),
      )}
    </ul>
  );
}
