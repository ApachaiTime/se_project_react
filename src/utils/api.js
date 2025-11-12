const baseUrl = "http://localhost:3001";
const getItems = () => {
  return fetch(`${baseUrl}/items`).then((res) => res.json());
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
  }).then((res) => res.json());
};

const deleteItem = (id) => {
  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
};

export { getItems, addItems, deleteItem };
