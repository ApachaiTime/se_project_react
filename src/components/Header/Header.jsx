import "./Header.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import WeatherCard from "../WeatherCard/WeatherCard";
import appLogo from "../../assets/app-logo.png";
import avatarPlaceholder from "../../assets/avatar.svg";
const currentDate = new Date().toLocaleString("default", {
  month: "long",
  day: "numeric",
});
export default function Header({ weatherData, handleOpenAddGarmentModal }) {
  return (
    <header>
      <div className="header__container">
        <span className="header__span-left">
          <img src={appLogo} alt="wtwr logo" className="header__logo" />
          <p className="header__info">
            {currentDate}, {weatherData.city}
          </p>
        </span>
        <span className="header__span-right">
          <button onClick={handleOpenAddGarmentModal} className="header__btn">
            + Add clothes
          </button>
          <p className="header__name">Terrence</p>
          <img src={avatarPlaceholder} alt="" className="header__avatar" />
        </span>
      </div>
    </header>
  );
}
