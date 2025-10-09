import { useState, useEffect } from "react";
import { getWeatherData } from "../../utils/weatherApi.js";
import ItemModal from "../ItemModal/ItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "./App.css";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header.jsx";
import DefaultClothingItems from "../../utils/clothingItems.js";
import "../ModalWithForm/ModalWithForm.css";

export default function App() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [cards, setCards] = useState(DefaultClothingItems);
  const [weatherData, setWeatherData] = useState({
    city: "Loading...",
    temperature: 0,
  });

  useEffect(() => {
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch((err) => {
        setWeatherData(handleError(err));
      });
  }, []);

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
      >
        <label htmlFor="name" className="modal__input__title">
          Name
        </label>
        <input
          className="modal__input"
          id="name"
          type="text"
          placeholder="Name"
        />
        <label htmlFor="image" className="modal__input__title">
          Image
        </label>
        <input
          className="modal__input"
          id="image"
          type="url"
          placeholder="Image URL"
        />
        <p className="modal__input__title">Select the weather type:</p>
        <ul className="modal__radio__list">
          <li className="modal__radio__item">
            <input
              id="hot"
              value={"hot"}
              name="condition"
              type="radio"
              className="modal__radio__input"
            />
            <label htmlFor="hot" className="modal__radio__label">
              Hot
            </label>
          </li>
          <li className="modal__radio__item">
            <input
              id="warm"
              value={"warm"}
              name="condition"
              type="radio"
              className="modal__radio__input"
            />
            <label htmlFor="warm" className="modal__radio__label">
              Warm
            </label>
          </li>

          <li className="modal__radio__item">
            <input
              id="cold"
              value={"cold"}
              name="condition"
              type="radio"
              className="modal__radio__input"
            />
            <label htmlFor="cold" className="modal__radio__label">
              Cold
            </label>
          </li>
        </ul>
      </ModalWithForm>
      <ItemModal
        isOpen={activeModal === "preview"}
        card={selectedCard}
        onClose={handleCloseModal}
      ></ItemModal>
    </>
  );
}
