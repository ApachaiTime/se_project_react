import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import { removeToken } from "../../utils/token";
import "../Profile/Profile.css" 
export default function Profile({
  cards,
  handleCardClick,
  weatherData,
  handleOpenAddGarmentModal,
  handleOpenProfileDataModal,
}) {
  return (
    <div className="profile">
      <div className="profile__content">
        <SideBar
          removeToken={removeToken}
          handleOpenProfileDataModal={handleOpenProfileDataModal}
        />

        <ClothesSection
          cards={cards}
          handleCardClick={handleCardClick}
          weatherData={weatherData}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
        />
      </div>
    </div>
  );
}
