import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { getToken, setToken, removeToken } from "../../utils/token.js";
import {
  getItems,
  addItems,
  deleteItem,
  addLike,
  removelike,
} from "../../utils/api.js";
import Profile from "../Profile/Profile.jsx";
import MobileMenu from "../MobileMenu/MobileMenu.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import { handleError, getWeatherData } from "../../utils/weatherApi.js";
import ItemModal from "../ItemModal/ItemModal.jsx";
import { AddItemModal } from "../AddItemModal/AddItemModal.jsx";
import Footer from "../Footer/Footer.jsx";
import "./App.css";
import Main from "../Main/Main.jsx";
import Header from "../Header/Header.jsx";
import "../ModalWithForm/ModalWithForm.css";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import ProfileDataModal from "../ProfileDataModal/ProfileDataModal.jsx";
import { handleLogin, endPointCall } from "../../utils/auth.js";
import { ErrorContext } from "../../contexts/ErrorContext.js";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

export default function App() {
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpened, setIsMobileMenuOpened] = useState(false);
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [checked, setChecked] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [cards, setCards] = useState([]);
  const [weatherData, setWeatherData] = useState({
    city: "Loading...",
    temperature: 0,
  });
  const jwt = getToken();
  useEffect(() => {
    getItems()
      .then((items) => {
        setCards(items);
      })
      .catch((err) => {
        return console.error("Encountered", err, "unable to load items");
      });
    getWeatherData()
      .then((data) => setWeatherData(data))
      .catch((err) => {
        return setWeatherData(handleError(err));
      });

    if (!jwt) {
      return;
    } else {
      endPointCall("/users/me", "GET", null, true)
        .then((data) => {
          setCurrentUser(data);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          return console.error("Error fetching user data:", err);
        });
    }
  }, []);

  function handleUseGeolocation() {
    return getWeatherData()
      .then((data) => {
        setWeatherData(data);
        return data;
      })
      .catch((err) => {
        return setWeatherData(handleError(err));
      });
  }

  const handleCardLike = ({ id, isLiked }) => {
    // Check if this card is not currently liked
    {
      !isLiked
        ? addLike(id)
            .then((updatedCard) => {
              setCards(() =>
                cards.map((item) => (item._id === id ? updatedCard : item)),
              );
            })
            .catch((err) => console.error(err))
        : removelike(id)
            .then((updatedCard) => {
              setCards((cards) =>
                cards.map((item) => (item._id === id ? updatedCard : item)),
              );
            })
            .catch((err) => console.error(err));
    }
  };
  const handleAddCard = (item) => {
    setIsLoading(true);
    return addItems({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
      id: item._id,
    })
      .then((res) => {
        setCards([res, ...cards]);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        return console.error("Encountered", err, "unable to add item");
      });
  };

  useEffect(() => {
    if (!activeModal) return;
    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  const onDelete = (item) => {
    setIsLoading(true);
    deleteItem(item._id)
      .then(() => {
        setCards(cards.filter((currentItem) => currentItem._id !== item._id));
      })
      .then(() => {
        handleCloseModal();
        setIsLoading(true);
      })
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) =>
        console.error("Encountered", err, "unable to delete item"),
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

  function handleOpenSignUpModal() {
    setActiveModal("register");
  }
  function handleOpenLoginModal() {
    setActiveModal("login");
  }

  function handleCloseModal() {
    setActiveModal("");
    setSelectedCard(null);
  }
  function handleOpenProfileDataModal() {
    setActiveModal("profile-data");
  }

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <CurrentUserContext.Provider
        value={{ currentUser, setCurrentUser, setIsLoggedIn }}
      >
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTempUnit, handleChange, checked }}
        >
          <div className="app">
            <Header
              setCurrentUser={setCurrentUser}
              handleOpenAddGarmentModal={handleOpenAddGarmentModal}
              weatherData={weatherData}
              toggleMobileMenu={toggleMobileMenu}
              onUseGeolocation={handleUseGeolocation}
              isLoggedIn={isLoggedIn}
              handleOpenLoginModal={handleOpenLoginModal}
              handleOpenSignUpModal={handleOpenSignUpModal}
            ></Header>
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    cards={cards}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      cards={cards}
                      handleCardClick={handleCardClick}
                      weatherData={weatherData}
                      handleOpenProfileDataModal={handleOpenProfileDataModal}
                      handleOpenAddGarmentModal={handleOpenAddGarmentModal}
                      onClose={handleCloseModal}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
          <Footer />

          <ItemModal
            onDelete={onDelete}
            isOpen={activeModal === "preview"}
            card={selectedCard}
            buttonText={isLoading ? "Deleting" : "Delete item"}
            onClose={handleCloseModal}
          ></ItemModal>
          <AddItemModal
            onClose={handleCloseModal}
            isOpen={activeModal === "add-garment"}
            title="Add New Garment"
            onAddItem={handleAddCard}
            name="add-garment"
            buttonText={isLoading ? "Saving" : "Add garment"}
          ></AddItemModal>
          <MobileMenu
          isLoggedIn={isLoggedIn}
            toggleMobileMenu={toggleMobileMenu}
            isMobileMenuOpened={isMobileMenuOpened}
            handleOpenAddGarmentModal={handleOpenAddGarmentModal}
            handleOpenLoginModal={handleOpenLoginModal}
            handleOpenSignUpModal={handleOpenSignUpModal}
            onClose={toggleMobileMenu}
          ></MobileMenu>
          <LoginModal
            title="Log in"
            name="login"
            buttonText={"Next"}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            isOpened={activeModal === "login"}
            handleCloseModal={handleCloseModal}
            setIsLoggedIn={setIsLoggedIn}
            handleSubmit={handleLogin}
            onClose={handleCloseModal}
            handleOpenSignUpModal={handleOpenSignUpModal}
          ></LoginModal>
          <RegisterModal
            title="Register"
            name="register"
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            buttonText={"Next"}
            isOpened={activeModal === "register"}
            handleCloseModal={handleCloseModal}
            setIsLoggedIn={setIsLoggedIn}
            onClose={handleCloseModal}
            handleOpenLoginModal={handleOpenLoginModal}
          ></RegisterModal>
          <ProfileDataModal
            title={"Change Profile Data"}
            name={"profile-data"}
            buttonText={"Save Changes"}
            isOpen={activeModal === "profile-data"}
            onClose={handleCloseModal}
            isOpened={activeModal === "profile-data"}
          />
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </ErrorContext.Provider>
  );
}
