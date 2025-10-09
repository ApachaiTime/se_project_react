import "./ItemModal.css";
import closeIcon from "../../assets/x-icon.png";
export default function ItemModal({ isOpen, card, onClose }) {
  if (!card) return null;

  return (
    <div className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="item__modal__container">
        <button className="item__modal__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close icon" />
        </button>
        <img className="item__modal__img" src={card.link} alt={card.name} />
        <h2 className="item__modal__title">{card.name}</h2>
        <p>Weather: {card.weather}</p>
      </div>
    </div>
  );
}
