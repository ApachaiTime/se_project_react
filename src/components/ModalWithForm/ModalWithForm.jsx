import "./ModalWithForm.css";
import closeIcon from "../../assets/x-icon.png";
export default function ModalWithForm({
  title,
  name,
  buttonText,
  isOpen,
  onClose,
  children,
  handleSubmit,
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
          <form className="modal__form" onSubmit={handleSubmit}>
            {children}

            <button
              onClick={handleSubmit}
              type="submit"
              className="modal__submit-button"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}
