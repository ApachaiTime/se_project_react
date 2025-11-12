import "./ItemCard.css";
export function ItemCard({ card, handleCardClick }) {
  return (
    <div className="item-card">
      <img
        className="item__img"
        src={card.imageUrl}
        alt={card.name}
        onClick={() => handleCardClick(card)}
      />
      <p className="item__title">{card.name}</p>
    </div>
  );
}
