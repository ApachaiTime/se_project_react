import { checkResponse } from "./weatherApi";
const baseUrl = "http://localhost:3001";
const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

const addItems = ({ name, imageUrl, weather }) => {
  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  }).then(checkResponse);
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then(checkResponse);
};

export { getItems, addItems, deleteItem };
