import "./WeatherCard.css";

export default function WeatherCard({ weatherData }) {
  return (
    <div className="weather-card">
      <p className="weather-card__temperature">{weatherData.temperature}</p>
    </div>
  );
}
