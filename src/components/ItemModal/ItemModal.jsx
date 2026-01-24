import "./ItemModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import closeIcon from "../../assets/x-icon.png";
export default function ItemModal({
  isOpen,
  card,
  onClose,
  onDelete,
  buttonText,
}) {
  if (!card) return null;
  const { currentUser } = useContext(CurrentUserContext);
  const isOwner = currentUser && card.owner === currentUser._id;
  const itemDeleteButtonClassName = isOwner ? "item__modal__delete" : "item__modal__delete_hidden";
  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="item__modal__container">
        <button className="item__modal__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close icon" />
        </button>
        <div className="item__modal__content">
          <img
            className="item__modal__img"
            src={card.imageUrl}
            alt={card.name}
          />
          <h2 className="item__modal__title">{card.name}</h2>
        </div>

        <p className="item__modal__condition">Weather: {card.weather}</p>
        <button
          onClick={() => onDelete(card)}
          className={itemDeleteButtonClassName}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
