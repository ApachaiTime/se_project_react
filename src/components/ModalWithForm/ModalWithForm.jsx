import "./ModalWithForm.css";
import "../App/App.jsx";
import closeIcon from "../../assets/x-icon.png";
export default function ModalWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
}) {
  return isOpen ? (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__container">
        <div className="modal__content">
          <button onClick={onClose} className="modal__close__btn">
            <img
              className="modal__btn__img"
              src={closeIcon}
              alt="Close button"
            />
          </button>
          <h2 className="modal__title">{title}</h2>
          <form className="modal__form">
            <label htmlFor="name" className="modal__input__title">
              Name
            </label>
            <input
              id="name"
              type="text"
              className="modal__input"
              placeholder="Name"
            />
            <label htmlFor="image" className="modal__input__title">
              Image
            </label>
            <input
              id="image"
              type="text"
              className="modal__input"
              placeholder="Image URL"
            />
            <p className="modal__input__title">Select the weather type:</p>
            <ul className="modal__radio__list">
              <li className="modal__radio__item">
                <input
                  id="hot"
                  value={"option1"}
                  name="condition"
                  type="radio"
                  className="modal__radio__input"
                />
                <label htmlFor="hot" className="modal__radio__label">
                  Hot
                </label>
              </li>
              <li className="modal__radio__item">
                <input
                  id="warm"
                  value={"option2"}
                  name="condition"
                  type="radio"
                  className="modal__radio__input"
                />
                <label htmlFor="warm" className="modal__radio__label">
                  Warm
                </label>
              </li>

              <li className="modal__radio__item">
                <input
                  id="cold"
                  value={"option3"}
                  name="condition"
                  type="radio"
                  className="modal__radio__input"
                />
                <label htmlFor="cold" className="modal__radio__label">
                  Cold
                </label>
              </li>
            </ul>
            <button type="submit" className="modal__submit-button">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
