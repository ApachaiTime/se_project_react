import { useState, useEffect } from "react";
import { getWeatherData } from "../../utils/weatherApi.js";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./App.css";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header.jsx";
import DefaultClothingItems from "../../utils/clothingItems.js";

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [cards, setCards] = useState(DefaultClothingItems);
  const [weatherData, setWeatherData] = useState("");

  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch((err) => {
        console.error("Error fetching weather data:", err);
      }, []);
  });

  function handleOpenAddGarmentModal() {
    setActiveModal("add-garment");
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setActiveModal("preview");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }

  return (
    <>
      <div className="app">
        <Header
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          weatherData={weatherData}
        />
        <Main
          weatherData={weatherData}
          cards={cards}
          handleCardClick={handleCardClick}
        ></Main>
      </div>
      <Footer />
      <ModalWithForm
        onClose={() => setActiveModal("")}
        isOpen={activeModal === "add-garment"}
        title="Add New Garment"
        name="add-garment"
        buttonText="Add garment"
      />
      <ItemModal
        isOpen={activeModal === "preview"}
        card={selectedCard}
        onClose={handleCloseModal}
      ></ItemModal>
    </>
  );
}
