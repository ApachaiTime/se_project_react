import { apikey, latitude, longitude } from "./constants";

function getUserCoords(timeout = 10000) {
  return new Promise((resolve, reject) => {
    if (!navigator || !navigator.geolocation) {
      return reject(new Error("Geolocation not supported"));
    }

    const onSuccess = (pos) => {
      resolve({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    };

    const onError = (err) => {
      reject(err);
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError, {
      timeout,
    });
  });
}

function buildWeatherUrl(lat, lon) {
  return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apikey}`;
}

function getWeatherData() {
  // Try to get user's location first, otherwise fall back to defaults from constants
  return getUserCoords()
    .catch(() => {
      // fallback to constants (string values in constants.js)
      return {
        lat: parseFloat(latitude),
        lon: parseFloat(longitude),
        _fallback: true,
      };
    })
    .then((coords) => {
      const { lat, lon, _fallback } = coords || {};
      const weatherURL = buildWeatherUrl(lat, lon);
      return fetch(weatherURL)
        .then(checkResponse)
        .then((data) => {
          const weatherInfo = {
            city: data.name,
            temperature: Math.round(data.main.temp),
            temperatureC: Math.round(((data.main.temp - 32) * 5) / 9),
            condition: data.weather[0].main,
            time: data.dt,
            sunset: data.sys.sunset,
            sunrise: data.sys.sunrise,
            coordsSource: _fallback ? "fallback" : "geolocation",
          };

          // debug: log API response temps and chosen source
          try {
            // eslint-disable-next-line no-console
          } catch (e) {}

          return weatherInfo;
        });
    });
}

function getWeatherCondition(temperature) {
  if (temperature >= 80) {
    return "hot";
  } else if (temperature >= 60) {
    return "warm";
  } else {
    return "cold";
  }
}

const checkResponse = (res) => {
  return res.ok
    ? res.json()
    : Promise.reject(new Error(`Request failed with status ${res.status}`));
};

function handleError(error) {
  return {
    city: `failed to load ${error}`,
    temperature: `unknown ${error}`,
    condition: `failed to load ${error}`,
  };
}

export { checkResponse, handleError, getWeatherCondition, getWeatherData };
