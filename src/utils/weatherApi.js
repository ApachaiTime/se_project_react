import { APIkey, latitude, longitude } from "./constants";
export function getWeatherData() {
  const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`;
  return fetch(weatherURL)
    .then((res) => res.json())
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
