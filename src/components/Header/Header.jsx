import "./Header.css";

import headerBtn from "../../assets/header-btn-icon.png";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import appLogo from "../../assets/app-logo.png";
import avatarPlaceholder from "../../assets/avatar.svg";
const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});
export default function Header({
  checked,
  handleChange,
  weatherData,
  handleOpenAddGarmentModal,
  toggleMobileMenu,
}) {
  return (
    <header>
      <div className="header__container">
        <span className="header__span-left">
          <Link to="/">
            <img src={appLogo} alt="wtwr logo" className="header__logo" />
          </Link>
          <p className="header__info">
            {currentDate}, {weatherData.city}
          </p>
        </span>
        <button
          onClick={() => {
            toggleMobileMenu();
          }}
          className="header__options"
        >
          <img src={headerBtn} alt="Menu icon" />
        </button>
        <span className="header__span-right">
          <ToggleSwitch labelFahrenheit="F" labelCelsius="C" 
          />

          <button onClick={handleOpenAddGarmentModal} className="header__btn">
            + Add clothes
          </button>
          <p className="header__name">Terrence</p>
          <Link to="/profile">
            {" "}
            <img
              src={avatarPlaceholder}
              alt="User avatar"
              className="header__avatar"
            />
          </Link>
        </span>
      </div>
    </header>
  );
}
