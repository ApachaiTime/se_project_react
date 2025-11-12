import avatarPlaceholder from "../../assets/avatar.svg";
import "./SideBar.css";
export default function SideBar() {
  return (
    <aside className="sidebar">
      <img
        src={avatarPlaceholder}
        alt="User avatar"
        className="header__avatar"
        style={{
          width: "56px",
          height: "56px",
        }}
      />
      <p className="header__name">Terrence</p>
    </aside>
  );
}
