import { apikey, latitude, longitude } from "./constants";
function getWeatherData() {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apikey}`;
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
      };

      return weatherInfo;
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
    : Promise.reject(new Error`{https ${res.status}}`());
};

function handleError(error) {
  return {
    city: `failed to load ${error}`,
    temperature: `unknown ${error}`,
    condition: `failed to load ${error}`,
  };
}

export { checkResponse, handleError, getWeatherCondition, getWeatherData };
