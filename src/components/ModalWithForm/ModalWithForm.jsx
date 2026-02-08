import "./ModalWithForm.css";
import Spinner from "../Spinner/Spinner";
import closeIcon from "../../assets/x-icon.png";

export default function ModalWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  children,
  handleSubmit,
  isLoading,
  isValid,
}) {
  return isOpen ? (
    <div className={`modal modal_type_${name}`}>
      <div className="modal__container">
        <div className="modal__content">
          <button onClick={onClose} className="modal__close__btn" type="button">
            <img
              className="modal__btn__img "
              src={closeIcon}
              alt="Close button"
            />
          </button>
          <h2 className="modal__title">{title}</h2>
          <form className="modal__form" onSubmit={handleSubmit} noValidate>
            {children}
            {isLoading ? (
              <Spinner />
            ) : (
              <button
                type="submit"
                disabled={isValid === false}
                className={`modal__submit-button modal__submit-button_type_${name} ${isValid === false ? "modal__submit-button_disabled" : ""}`}
              >
                {buttonText}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
