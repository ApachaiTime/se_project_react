import { baseUrl } from "./api.js";
import { getToken, setToken } from "./token.js";
import { checkResponse } from "./weatherApi.js";

function endPointCall(endpoint, method, body = null, requiresAuth = false) {
  const jwt = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(requiresAuth ? { authorization: `Bearer ${jwt}` } : {}),
  };

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = body;
  }

  return fetch(`${baseUrl}${endpoint}`, options).then(checkResponse);
}
const handleRegistration = (formValues) => {
  return endPointCall("/signup", "POST", JSON.stringify(formValues))
    .then((data) => {
      return data;
    })

    .catch((err) => {
      // console.error(`Error Signing up: ${err.status} ${err.message}`);
      const customErr = new Error("Email already in use");
      customErr.status = 409;
      throw customErr;
    });
};

const handleLogin = ({ email, password }) => {
  if (!email || !password) {
    return console.error("Email and password are required for login");
  }

  return endPointCall("/signin", "POST", JSON.stringify({ email, password }))
    .then((data) => {
      if (data !== undefined) {
        return setToken(data.token);
      }
    })
    .then(() => {
      return endPointCall("/users/me", "GET", null, true);
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      const customErr = new Error("Invalid email or password");
      customErr.status = 401;
      throw customErr;
    });
};

export { handleRegistration, handleLogin, endPointCall };
