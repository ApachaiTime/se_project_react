import avatarPlaceholder from "../../assets/avatar.svg";
import "./SideBar.css";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";
export default function SideBar({ removeToken, handleOpenProfileDataModal }) {
  const { currentUser, setIsLoggedIn } = useContext(CurrentUserContext);

  return (
    <aside className="sidebar">
      <span className="sidebar__profile-info">
        <img src={currentUser?.avatar} alt="User avatar" className="header__avatar" />
        <p className="header__name">{currentUser?.name}</p>
      </span>
      <button
        onClick={handleOpenProfileDataModal}
        type="button"
        className="sidebar__change-profile-button"
      >
        Change profile data
      </button>

      <button
        type="button"
        className="sidebar__logout-button"
        onClick={() => {
          removeToken();
          setIsLoggedIn(false);
        }}
      >
        Log out
      </button>
    </aside>
  );
}
