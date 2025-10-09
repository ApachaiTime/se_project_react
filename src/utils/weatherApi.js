import { APIkey, latitude, longitude } from "./constants";
export function getWeatherData() {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  return fetch(weatherURL)
    .then((res) => res.json())
    .then((data) => {
      return {
        city: data.name,
        temperature: Math.round(data.main.temp),
        condition: data.weather[0].main,
      };
    });
}

export function getWeatherCondition(temperature) {
  if (temperature >= 80) {
    return "hot";
  } else if (temperature >= 60) {
    return "warm";
  } else {
    return "cold";
  }
}

export function handleError(error) {
  console.error("Error fetching weather data:", error);
  return {
    city: "failed to load",
    temperature: "unknown",
    condition: "failed to load",
  };
}
