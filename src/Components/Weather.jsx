import { useState, useEffect } from 'react'

const WMO = {
  0:'Ясно', 1:'Переважно ясно', 2:'Мінлива хмарність', 3:'Похмуро',
  45:'Туман', 48:'Туман з інієм', 51:'Легка мряка', 53:'Мряка', 55:'Сильна мряка',
  61:'Легкий дощ', 63:'Дощ', 65:'Сильний дощ',
  71:'Легкий сніг', 73:'Сніг', 75:'Сильний сніг',
  80:'Злива', 81:'Злива', 82:'Сильна злива', 95:'Гроза', 96:'Гроза з градом'
}
const ICON = {
  0:'☀️', 1:'🌤️', 2:'⛅', 3:'☁️', 45:'🌫️', 48:'🌫️',
  51:'🌦️', 53:'🌦️', 55:'🌧️', 61:'🌧️', 63:'🌧️', 65:'🌧️',
  71:'❄️', 73:'❄️', 75:'❄️', 80:'🌧️', 81:'🌧️', 82:'⛈️', 95:'⛈️', 96:'⛈️'
}

export default function Weather() {
  const [weather, setWeather] = useState(null)
  const [error, setError]     = useState(false)

  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=49.8397&longitude=24.0297' +
      '&current=temperature_2m,apparent_temperature,weathercode,windspeed_10m,relativehumidity_2m'
    )
      .then(r => r.json())
      .then(d => setWeather(d.current))
      .catch(() => setError(true))
  }, [])

  if (error) return (
    <div className="weather-card">
      <span className="weather-error">⚠️ Не вдалося завантажити погоду</span>
    </div>
  )

  if (!weather) return (
    <div className="weather-card">
      <div className="spinner-wrap">
        <div className="spinner" />
        Завантажую погоду...
      </div>
    </div>
  )

  const code = weather.weathercode
  return (
    <div className="weather-card">
      <div className="weather-icon">{ICON[code] || '🌡️'}</div>
      <div className="weather-info">
        <div className="weather-temp">{Math.round(weather.temperature_2m)}°C</div>
        <div className="weather-desc">{WMO[code] || 'Невідомо'}</div>
        <div className="weather-city">📍 Львів</div>
      </div>
      <div className="weather-details">
        <span>💧 {weather.relativehumidity_2m}%</span>
        <span>💨 {Math.round(weather.windspeed_10m)} км/г</span>
        <span>Відчувається {Math.round(weather.apparent_temperature)}°</span>
      </div>
    </div>
  )
}