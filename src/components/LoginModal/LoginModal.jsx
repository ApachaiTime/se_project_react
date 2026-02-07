import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { handleLogin } from "../../utils/auth.js";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import "../RegisterModal/RegisterModal.css";
import "../LoginModal/LoginModal.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
import { ErrorContext } from "../../contexts/ErrorContext.js";
const LoginModal = ({
  title,
  name,
  buttonText,
  isOpened,
  onClose,
  setIsLoggedIn,
  handleCloseModal,
  handleOpenSignUpModal,
  setIsLoading,
  isLoading,
}) => {
  const { setCurrentUser } = useContext(CurrentUserContext);
  const { error, setError } = useContext(ErrorContext);
  const [submitted, setSubmitted] = useState(false);
  const { values, handleChange, isValid, errors, resetForm, validateForm } =
    useFormWithValidation({
      email: "",
      password: "",
    });

  const handleSignIn = (evt) => {
    evt.preventDefault();
    validateForm(evt.target);
    setSubmitted(true);
    if (!isValid) {
      return;
    } else {
      handleLogin(values)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
        })

        .then(() => {
          setIsLoading(true);
          setTimeout(() => {
            handleCloseModal();
            resetForm({ email: "", password: "" });
            setIsLoading(false);
            setError(null);
          }, 1000);
        })

        .catch((err) => {
          console.error(err);
          setError(err.message);
        });
    }
  };

  return (
    <ModalWithForm
      title={title}
      name={name}
      buttonText={buttonText}
      isOpen={isOpened}
      onClose={onClose}
      handleSubmit={handleSignIn}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
      isValid={isValid}
    >
      <label htmlFor="email" className="modal__input__title">
        Email
      </label>
      {(submitted && errors.email) || error == "Invalid email or password" ? (
        <p className="modal__error">{errors.email || error}</p>
      ) : null}
      <input
        className={`modal__input ${
          (submitted && errors.email) || error == "Invalid email or password"
            ? "modal__input_type_error"
            : ""
        }`}
        id="email"
        type="email"
        placeholder="Email"
        name="email"
        value={values.email}
        onChange={handleChange}
        required
        minLength={1}
      />

      <label htmlFor="password" className="modal__input__title">
        Password
      </label>
      {(submitted && errors.password) ||
      error == "Invalid email or password" ? (
        <p className="modal__error">{errors.password || error}</p>
      ) : null}
      <input
        className={`modal__input ${
          (submitted && errors.password) || error == "Invalid email or password"
            ? "modal__input_type_error"
            : ""
        }`}
        id="password"
        type="password"
        placeholder="Password"
        name="password"
        value={values.password}
        onChange={handleChange}
        required
        minLength={5}
        style={{ marginBottom: 32 }}
      />

      <button
        type="button"
        onClick={handleOpenSignUpModal}
        className="modal__register-button"
      >
        or Register
      </button>
    </ModalWithForm>
  );
};
export default LoginModal;
