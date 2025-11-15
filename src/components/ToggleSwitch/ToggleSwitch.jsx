import "./ToggleSwitch.css";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
export default function ToggleSwitch({ labelCelsius, labelFahrenheit }) {
  const {handleChange, checked} = useContext(
    CurrentTemperatureUnitContext
  );



  return (
    <div className="toggle-switch__container">
      <input
        id={"toggle-switch"}
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="toggle-switch__input"
      />

      <label htmlFor="toggle-switch" className="toggle-switch__label">
        <span className="toggle-switch__F">{labelFahrenheit}</span>
        <label htmlFor="toggle-switch">
          <span className="toggle-switch__slider"></span>
        </label>
        <span className="toggle-switch__C">{labelCelsius}</span>
      </label>
    </div>
  );
}
