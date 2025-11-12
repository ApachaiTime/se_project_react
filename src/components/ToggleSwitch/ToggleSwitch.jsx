import "./ToggleSwitch.css";
export default function ToggleSwitch({
  labelCellsius,
  labelFahrenheit,
  value,
  onChange,
}) {
  return (
    <div className="toggle-switch__container">
      <input
        id={"toggle-switch"}
        type="checkbox"
        checked={value}
        onChange={onChange}
        className="toggle-switch__input"
      />

      <label htmlFor="toggle-switch" className="toggle-switch__label">
        <span className="toggle-switch__F">{labelFahrenheit}</span>
        <label htmlFor="toggle-switch">
          <span className="toggle-switch__slider"></span>
        </label>
        <span className="toggle-switch__C">{labelCellsius}</span>
      </label>
    </div>
  );
}
