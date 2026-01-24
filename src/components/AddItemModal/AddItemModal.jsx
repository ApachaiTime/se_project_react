import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./AddItemModal.css";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";

export const AddItemModal = ({
  onAddItem,
  title,
  name,
  buttonText,
  isOpen,
  onClose,
}) => {
  const {
    values,
    handleChange,
    isValid,
    errors,
    resetForm,
    setSubmitted,
    submitted,
    validateForm,
    setIsLoading,
  } = useFormWithValidation({
    name: "",
    imageUrl: "",
    weather: "",
  });
  function handleSubmitCard(evt) {
    evt.preventDefault();
    validateForm(evt.target);
    setSubmitted(true);

    if (!isValid) {
      return;
    } else {
      onAddItem(values)
        .then(() => {
          setSubmitted(false);
        })
        .then(() => {
          onClose();
          resetForm({ name: "", imageUrl: "", weather: "" }, {}, false);
        })
        .catch((err) => {
          console.error("Error adding item:", err);
        });
    }
  }
  return isOpen ? (
    <ModalWithForm
      title={title}
      name={name}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={handleSubmitCard}
      setIsLoading={setIsLoading}
    >
      <label htmlFor="name" className="modal__input__title">
        Name
      </label>
      {submitted && errors.name ? (
        <p className="modal__error">{errors.name}</p>
      ) : null}
      <input
        className={`modal__input ${
          submitted && errors.name ? "modal__input_type_error" : ""
        }`}
        id="name"
        type="text"
        placeholder="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        minLength={2}
        required
      />

      <label htmlFor="image" className="modal__input__title">
        Image
      </label>
      {submitted && errors.imageUrl ? (
        <p className="modal__error">{errors.imageUrl}</p>
      ) : null}
      <input
        className={`modal__input ${
          submitted && errors.imageUrl ? "modal__input_type_error" : ""
        }`}
        id="image"
        type="url"
        placeholder="Image URL"
        name="imageUrl"
        value={values.imageUrl}
        onChange={handleChange}
        required
      />

      <p className="modal__input__title">Select the weather type:</p>
      <ul className="modal__radio__list">
        {submitted && errors.weather ? (
          <p className="modal__error modal__error">{errors.weather}</p>
        ) : null}
        <li
          className={`modal__radio__item ${
            submitted && errors.weather ? "modal__radio__item_type_error" : null
          }`}
        >
          <input
            name="weather"
            checked={values.weather === "hot"}
            onChange={handleChange}
            id="hot"
            value={"hot"}
            type="radio"
            className="modal__radio__input"
          />

          <label htmlFor="hot" className="modal__radio__label">
            Hot
          </label>
        </li>
        <li
          className={`modal__radio__item ${
            submitted && errors.weather ? "modal__radio__item_type_error" : ""
          }`}
        >
          <input
            name="weather"
            checked={values.weather === "warm"}
            onChange={handleChange}
            id="warm"
            value={"warm"}
            type="radio"
            className="modal__radio__input"
          />

          <label htmlFor="warm" className="modal__radio__label">
            Warm
          </label>
        </li>

        <li
          className={`modal__radio__item ${
            submitted && errors.weather ? "modal__radio__item_type_error" : ""
          }`}
        >
          <input
            name="weather"
            checked={values.weather === "cold"}
            onChange={handleChange}
            id="cold"
            value={"cold"}
            type="radio"
            className="modal__radio__input"
          />

          <label htmlFor="cold" className="modal__radio__label">
            Cold
          </label>
        </li>
      </ul>
    </ModalWithForm>
  ) : null;
};
