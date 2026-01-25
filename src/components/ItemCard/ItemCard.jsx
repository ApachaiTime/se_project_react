import "./ItemCard.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
export function ItemCard({ card, handleCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);
  const isLiked =
    card.likes && card.likes.some((userId) => userId === currentUser?._id);
  const handleLike = () => {
    onCardLike({
      id: card._id,
      isLiked: isLiked,
    });
  };
  return (
    <div className="item-card">
      <img
        className="item__img"
        src={card.imageUrl}
        alt={card.name}
        onClick={() => handleCardClick(card)}
      />
      {isLoggedIn ? (
        <>
          <button
            onClick={handleLike}
            className={`item__like-button ${isLiked ? "item__like-button_active" : ""}`}
          ></button>
          <p className="item__title">{card.name}</p>
        </>
      ) : null}
    </div>
  );
}
