import { endPointCall } from "./auth.js";
const baseUrl = "https://seprojectexpress-production-2cb7.up.railway.app";

const getItems = () => {
  return endPointCall("/items", "GET", null);
};

const addItems = ({ name, imageUrl, weather }) => {
  return endPointCall(
    "/items",
    "POST",
    JSON.stringify({ name, weather, imageUrl }),
    true,
  );
};

const deleteItem = (id) => {
  return endPointCall(`/items/${id}`, "DELETE", null, true);
};

const addLike = (id) => {
  return endPointCall(`/items/${id}/likes`, "PUT", null, true);
};

const removeLike = (id) => {
  return endPointCall(`/items/${id}/likes`, "DELETE", null, true);
};

export { getItems, addItems, deleteItem, baseUrl, addLike, removeLike };
