import { checkResponse } from "./weatherApi";
const baseUrl = "http://localhost:3001";
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}
const getItems = () => {
  return request(`${baseUrl}/items`);
};

const addItems = ({ name, imageUrl, weather }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      weather,
      imageUrl,
    }),
  });
};

const deleteItem = (id) => {
  return request(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  });
};

export { getItems, addItems, deleteItem };
