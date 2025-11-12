import "./ItemModal.css";

import closeIcon from "../../assets/x-icon.png";
export default function ItemModal({ isOpen, card, onClose, onDelete }) {
  if (!card) return null;

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
        <button onClick={() => onDelete(card)} className="item__modal__delete">
          Delete item
        </button>
      </div>
    </div>
  );
}
