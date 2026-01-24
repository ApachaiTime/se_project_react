import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";
import { handleRegistration } from "../../utils/auth.js";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import { useContext } from "react";
import { ErrorContext } from "../../contexts/ErrorContext.js";
const RegisterModal = ({
  title,
  name,
  buttonText,
  isOpened,
  onClose,
  handleOpenLoginModal,
  setIsLoading,
  isLoading,
}) => {
  const { error, setError } = useContext(ErrorContext);
  const [showSuccess, setShowSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { values, handleChange, isValid, errors, resetForm, validateForm } =
    useFormWithValidation({
      email: "",
      password: "",
      name: "",
      avatar: "",
    });
  const handleSignUp = (evt) => {
    evt.preventDefault();
    validateForm(evt.target);
    setSubmitted(true);
    if (!isValid) {
      return;
    } else {
      setIsLoading(true);
      handleRegistration(values)
        .then((data) => {
          setShowSuccess(true);
          setTimeout(() => {
            handleOpenLoginModal();
            setShowSuccess(false);
            resetForm({ email: "", password: "", name: "", avatar: "" });
            setIsLoading(false);
            setError(null);
          }, 2000);
        })

        .catch((err) => {
          setError(err.message);
          setIsLoading(false);
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
      handleSubmit={handleSignUp}
      setIsLoading={setIsLoading}
      isLoading={isLoading}
    >
      {showSuccess == true ? (
        <p className="modal__success__message">
          Registation successful! Please log in.
        </p>
      ) : (
        ""
      )}
      <label htmlFor="email" className="modal__input__title">
        Email*
      </label>
      {(submitted && errors.email) || error == "Email already in use" ? (
        <p className="modal__error">{errors.email || error}</p>
      ) : null}
      <input
        className={`modal__input ${
          (submitted && errors.email) || error == "Email already in use"
            ? "modal__input_type_error"
            : ""
        }`}
        id="email"
        type="email"
        placeholder="Email"
        name="email"
        values={values.email}
        onChange={handleChange}
        required
        minLength={1}
      />

      <label htmlFor="password" className="modal__input__title">
        Password
      </label>
      {submitted && errors.password ? (
        <p className="modal__error">{errors.password}</p>
      ) : null}
      <input
        className={`modal__input ${
          submitted && errors.password ? "modal__input_type_error" : ""
        }`}
        id="password"
        type="password"
        placeholder="Password"
        name="password"
        value={values.password}
        onChange={handleChange}
        required
        minLength={5}
      />
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
        Avatar
      </label>
      {submitted && errors.avatar ? (
        <p className="modal__error">{errors.avatar}</p>
      ) : null}
      <input
        className={`modal__input ${
          submitted && errors.avatar ? "modal__input_type_error" : ""
        }`}
        id="avatar"
        type="url"
        placeholder="Avatar URL"
        name="avatar"
        value={values.avatar}
        onChange={handleChange}
        required
        minLength={1}
      />

      <button
        type="button"
        className="modal__register-button "
        onClick={handleOpenLoginModal}
      >
        or Log in
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
