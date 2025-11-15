import "./MobileMenu.css";
import closeIcon from "../../assets/x-icon.png";
import avatarPlaceholder from "../../assets/avatar.svg";
export default function MobileMenu({
  isMobileMenuOpened,
  handleOpenAddGarmentModal,
  onClose,
}) {
  return (
    <div
      className={`mobile__modal ${
        isMobileMenuOpened ? "mobile__modal__opened" : ""
      }`}
    >
      <div className="mobile__content">
        <button className="item__modal__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close icon" />
        </button>
        <button onClick={handleOpenAddGarmentModal} className="header__btn">
          + Add clothes
        </button>
        <span className="mobile__user__info">
          <p className="header__name">Terrence</p>

          <img
            src={avatarPlaceholder}
            alt="User avatar"
            className="header__avatar"
          />
        </span>
      </div>
    </div>
  );
}
