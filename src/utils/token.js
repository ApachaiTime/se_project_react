const TOKEN_KEY = "jwt";

const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};
const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};
// Remove token from localStorage on logout
const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};
export { getToken, setToken, removeToken };
