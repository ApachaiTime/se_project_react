import "./Header.css";

import headerBtn from "../../assets/header-btn-icon.png";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import appLogo from "../../assets/app-logo.png";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});
export default function Header({
  weatherData,
  handleOpenAddGarmentModal,
  toggleMobileMenu,
  onUseGeolocation,
  isLoggedIn,
  handleOpenLoginModal,
  handleOpenSignUpModal,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  return isLoggedIn == true ? (
    <header>
      <div className="header__container">
        <span className="header__span-left">
          <Link to="/">
            <img src={appLogo} alt="wtwr logo" className="header__logo" />
          </Link>
          <p className="header__info">
            {currentDate}, {weatherData.city}
          </p>
          {/* coords source indicator */}
          <div className="header__coords">
            <span
              className={`header__coords-indicator header__coords-indicator_${
                weatherData && weatherData.coordsSource
                  ? weatherData.coordsSource
                  : "unknown"
              }`}
              title={`Source: ${
                weatherData && weatherData.coordsSource
                  ? weatherData.coordsSource
                  : "unknown"
              }`}
            />
          </div>

          {/* show persistent fallback notice when using default coords */}
          {weatherData && weatherData.coordsSource === "fallback" ? (
            <div className="header__fallback">
              <p className="header__fallback__text">
                {" "}
                Using default location (permission denied or unavailable)
              </p>

              <button
                className="header__fallback__btn"
                onClick={() => onUseGeolocation && onUseGeolocation()}
                type="button"
              >
                Retry my location
              </button>
            </div>
          ) : null}
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
          <ToggleSwitch labelFahrenheit="F" labelCelsius="C" />

          <button onClick={handleOpenAddGarmentModal} className="header__btn">
            + Add clothes
          </button>
          <p className="header__name">{currentUser?.name}</p>
          <Link to="/profile">
            {" "}
            <img
              src={currentUser?.avatar}
              alt="User avatar"
              className="header__avatar"
            />
          </Link>
        </span>
      </div>
    </header>
  ) : (
    <header>
      <div className="header__container">
        <span className="header__span-left">
          <Link to="/">
            <img src={appLogo} alt="wtwr logo" className="header__logo" />
          </Link>
          <p className="header__info">
            {currentDate}, {weatherData.city}
          </p>
          {/* coords source indicator */}
          <div className="header__coords">
            <span
              className={`header__coords-indicator header__coords-indicator_${
                weatherData && weatherData.coordsSource
                  ? weatherData.coordsSource
                  : "unknown"
              }`}
              title={`Source: ${
                weatherData && weatherData.coordsSource
                  ? weatherData.coordsSource
                  : "unknown"
              }`}
            />
          </div>

          {/* show persistent fallback notice when using default coords */}
          {weatherData && weatherData.coordsSource === "fallback" ? (
            <div className="header__fallback">
              Using default location (permission denied or unavailable)
              <button
                className="header__fallback__btn"
                onClick={() => onUseGeolocation && onUseGeolocation()}
                type="button"
              >
                Retry my location
              </button>
            </div>
          ) : null}
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
          <ToggleSwitch labelFahrenheit="F" labelCelsius="C" />

          <button onClick={handleOpenSignUpModal} className="header__btn">
            Sign Up
          </button>
          <button onClick={handleOpenLoginModal} className="header__btn">
            Log in{" "}
          </button>
        </span>
      </div>
    </header>
  );
}
