import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getItems, addItems, deleteItem } from "../../utils/api.js";
import Profile from "../Profile/Profile.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import { handleError } from "../../utils/weatherApi.js";
import { getWeatherData } from "../../utils/weatherApi.js";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { AddItemModal } from "../AddItemModal/AddItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import "./App.css";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header.jsx";
import "../ModalWithForm/ModalWithForm.css";
import {
  CurrentTemperatureUnitContext,
  temps,
} from "../../contexts/CurrentTemperatureUnitContext.js";

export default function App() {
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [checked, setChecked] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [cards, setCards] = useState([]);
  const [cardToDelete, setCardToDelete] = useState(null);
  const [weatherData, setWeatherData] = useState({
    city: "Loading...",
    temperature: 0,
  });

  useEffect(() => {
    getItems()
      .then((items) => {
        setCards(items);
      })
      .catch((err) => {
        console.error("Failed to fetch items", err);
      });
    getWeatherData()
      .then((data) => setWeatherData(data))

      .catch((err) => {
        setWeatherData(handleError(err));
      });
  }, []);

  const handleAddCard = (item) => {
    addItems({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
      id: item._id,
    })
      .then((res) => {
        setCards([...cards, res]);
      })
      .catch((err) => {
        console.error("Encountered", err, "unable to add item");
      });
  };

  const onDelete = (item) => {
    deleteItem(item._id)
      .then((res) => {
        setCards(cards.filter((currentItem) => currentItem._id !== item._id));
        handleCloseModal();
      })
      .catch((err) =>
        console.error("Encountered", err, "unable to delete item")
      );
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleChange = () => {
    setChecked(!checked);
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  function handleOpenAddGarmentModal() {
    isMobileMenuOpened ? toggleMobileMenu() : null;
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
      <CurrentTemperatureUnitContext.Provider value={temps[currentTempUnit]}>
        <div className="app">
          <Header
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            weatherData={weatherData}
            checked={checked}
            handleChange={handleChange}
            toggleMobileMenu={toggleMobileMenu}
          ></Header>
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  cards={cards}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  cards={cards}
                  handleCardClick={handleCardClick}
                  weatherData={weatherData}
                  handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                />
              }
            />
          </Routes>
        </div>
        <Footer />

        <ItemModal
          onDelete={onDelete}
          isOpen={activeModal === "preview"}
          card={selectedCard}
          onClose={handleCloseModal}
        ></ItemModal>
        <AddItemModal
          onClose={handleCloseModal}
          isOpen={activeModal === "add-garment"}
          title="Add New Garment"
          onAddItem={handleAddCard}
          name="add-garment"
          buttonText="Add garment"
        ></AddItemModal>
        <MobileMenu
          toggleMobileMenu={toggleMobileMenu}
          isMobileMenuOpened={isMobileMenuOpened}
          handleOpenAddGarmentModal={handleOpenAddGarmentModal}
          onClose={toggleMobileMenu}
        ></MobileMenu>
      </CurrentTemperatureUnitContext.Provider>
    </>
  );
}
