import "./MobileMenu.css";
import closeIcon from "../../assets/x-icon.png";
import {Link} from "react-router-dom"
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
export default function MobileMenu({
  isMobileMenuOpened,
  handleOpenAddGarmentModal,
  onClose,
  isLoggedIn,
  handleOpenLoginModal,
  handleOpenSignUpModal
}) {
  const { currentUser } = useContext(CurrentUserContext);
  return  isLoggedIn == true ? (
    <div
      className={`mobile__modal ${
        isMobileMenuOpened ? "mobile__modal__opened" : ""
      }`}
    >
      <div className="mobile__content">
        <button className="item__modal__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close icon" />
        </button>
       
        <button onClick={handleOpenAddGarmentModal} className="header__btn">
          + Add clothes
        </button>
        <span className="mobile__user__info">
          <p className="header__name">{currentUser?.name}</p>
<Link to="/profile">
          <img
            src={currentUser?.avatar}
            alt="User avatar"
            className="header__avatar"
          />
          </Link>
        </span>
         
      </div>
    </div>
  ) : (

   <div
      className={`mobile__modal ${
        isMobileMenuOpened ? "mobile__modal__opened" : ""
      }`}
    >
      <div className="mobile__content">
        <button className="item__modal__close-btn" onClick={onClose}>
          <img src={closeIcon} alt="Close icon" />
        </button>
       
         <button onClick={handleOpenSignUpModal} className="mobile__button">
            Sign Up
          </button>
          <button onClick={handleOpenLoginModal} className="mobile__button">
            Log in{" "}
          </button>
      
      </div>
    </div>


  
  )
}
