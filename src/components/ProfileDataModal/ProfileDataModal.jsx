import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "../RegisterModal/RegisterModal.css";
import "../LoginModal/LoginModal.css";
import { endPointCall } from "../../utils/auth";
const ProfileDataModal = ({ title, name, buttonText, isOpen, onClose }) => {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const [submitted, setSubmitted] = useState(false);
  const { values, handleChange, isValid, errors, resetForm, validateForm } =
    useFormWithValidation({
      name: "",
      avatar: "",
    });
  useEffect(() => {
    if (currentUser) {
      resetForm(
        { name: currentUser.name, avatar: currentUser.avatar },
        {},
        true,
      );
    }
  }, [currentUser]);
  const updateProfileData = (evt) => {
    evt.preventDefault();
    setSubmitted(true);
    validateForm(evt.target);
    if (!isValid) {
      return;
    } else {
      endPointCall("/users/me", "PATCH", JSON.stringify(values), true)
        .then((res) => {
          setCurrentUser(res);
          resetForm({ name: "", avatar: "" }, {}, false);
        })
        .then(() => {
          onClose();
        })
        .catch((err) => {
          console.error("Error unable to update profile state", err);
        });
    }
  };
  return isOpen ? (
    <ModalWithForm
      title={title}
      name={name}
      buttonText={buttonText}
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={updateProfileData}
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
        required
        minLength={1}
      />

      <label htmlFor="avatar" className="modal__input__title">
        Avatar URL
      </label>
      {submitted && errors.avatar ? (
        <p className="modal__error">{errors.avatar}</p>
      ) : null}
      <input
        className={`modal__input ${
          submitted && errors.avatar ? "modal__input_type_error" : ""
        }`}
        id="avatar"
        type="text"
        placeholder="Avatar URL"
        name="avatar"
        value={values.avatar}
        onChange={handleChange}
        required
        minLength={5}
        style={{ marginBottom: 32 }}
      />
    </ModalWithForm>
  ) : null;
};
export default ProfileDataModal;
