import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";
export const AddItemModal = ({
  onAddItem,
  title,
  name,
  buttonText,
  isOpen,
  onClose,
}) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  function handleSubmit(evt) {
    evt.preventDefault();
    console.log(values);
    onAddItem(values);
    setValues({ name: "", imageUrl: "", weather: "", id: "" });
    onClose();
  }
  return isOpen ? (
    <ModalWithForm
      handleSubmit={handleSubmit}
      title={title}
      name={name}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
    >
      <label htmlFor="name" className="modal__input__title">
        Name
      </label>
      <input
        className="modal__input"
        id="name"
        type="text"
        placeholder="Name"
        name="name"
        value={values.name}
        onChange={handleChange}
      />
      <label htmlFor="image" className="modal__input__title">
        Image
      </label>
      <input
        className="modal__input"
        id="image"
        type="url"
        placeholder="Image URL"
        name="imageUrl"
        value={values.imageUrl}
        onChange={handleChange}
      />
      <p className="modal__input__title">Select the weather type:</p>
      <ul className="modal__radio__list">
        <li className="modal__radio__item">
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
        <li className="modal__radio__item">
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

        <li className="modal__radio__item">
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
