import { checkResponse } from "./weatherApi";
import { getToken } from "./token.js";
import { endPointCall } from "./auth.js";
const baseUrl = "http://localhost:3001";
function request(url, options) {
  return fetch(url, options).then(checkResponse);
}
const getItems = () => {
  return request(`${baseUrl}/items`, {
    method: "GET",
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
  });
};

const addItems = ({ name, imageUrl, weather }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
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
    headers: {
      authorization: `Bearer ${getToken()}`,
    },
  });
};

const addLike = (id) => {
  return endPointCall(`/items/${id}/likes`, "PUT", null, true);
};

const removelike = (id) => {
  return endPointCall(`/items/${id}/likes`, "DELETE", null, true);
};

export { getItems, addItems, deleteItem, baseUrl, addLike, removelike };
