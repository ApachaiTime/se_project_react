import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";
import "./Profile.css";

export default function Profile({
  cards,
  handleCardClick,
  weatherData,
  handleOpenAddGarmentModal,
}) {
  return (
    <div className="profile">
      <div className="profile__content">
        <SideBar />

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
