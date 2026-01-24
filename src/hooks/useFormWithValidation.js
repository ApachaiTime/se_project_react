import { useState, useCallback } from "react";

function useFormWithValidation(defaultValues = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (evt) => {
    const { name, value, type } = evt.target;

    // keep form controlled
    setValues((prev) => ({ ...prev, [name]: value }));

    // force browser validity evaluation for this control
    if (typeof evt.target.checkValidity === "function") {
      evt.target.checkValidity();
    }

    // compute validation message
    let validationMessage = "";

    // RADIO GROUP: check whole group since individual radio validationMessage is unreliable
    if (type === "radio") {
      const form = evt.target.form;
      if (form) {
        const radios = Array.from(form.elements[name] || []);
        const anyChecked = radios.some((r) => r.checked);
        validationMessage = anyChecked ? "" : "Please select an option";
      }
    } else {
      validationMessage = evt.target.validationMessage || "";
    }

    setErrors((prev) => ({ ...prev, [name]: validationMessage }));

    // update overall form validity
    const form = evt.target.form;
    if (form) setIsValid(form.checkValidity());
  };

  const validateForm = useCallback((form) => {
    if (!form) return;

    const newErrors = {};
    const formElements = Array.from(form.elements);

    formElements.forEach((element) => {
      if (element.name) {
        let validationMessage = "";

        if (element.type === "radio") {
          // For radio groups, check if any radio with this name is checked
          const radios = Array.from(form.elements[element.name] || []);
          if (radios.length > 0 && !radios.some((r) => r.checked)) {
            validationMessage = "Please select an option";
          }
        } else {
          validationMessage = element.validationMessage || "";
        }

        if (validationMessage && !newErrors[element.name]) {
          newErrors[element.name] = validationMessage;
        }
      }
    });

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0 && form.checkValidity());
  }, []);

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [],
  );
  return {
    values,
    handleChange,
    setValues,
    errors,
    isValid,
    resetForm,
    setErrors,
    submitted,
    setSubmitted,
    validateForm,
  };
}

export { useFormWithValidation };
