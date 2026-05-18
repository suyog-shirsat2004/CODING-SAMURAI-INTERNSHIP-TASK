import React, { useState, useEffect } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_API_KEY || 'YOUR_API_KEY_HERE'
const API_URL = 'https://api.openweathermap.org/data/2.5'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searchedCity, setSearchedCity] = useState('')

  useEffect(() => {
    const savedCity = localStorage.getItem('lastSearchedCity')
    if (savedCity) {
      setCity(savedCity)
      fetchWeather(savedCity)
    }
  }, [])

  useEffect(() => {
    if (searchedCity) {
      localStorage.setItem('lastSearchedCity', searchedCity)
    }
  }, [searchedCity])

  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError('')
    setWeather(null)
    setForecast(null)

    try {
      const response = await fetch(
        `${API_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      )

      if (!response.ok) {
        throw new Error('City not found. Please try again.')
      }

      const data = await response.json()
      setWeather(data)
      setSearchedCity(data.name)

      const forecastResponse = await fetch(
        `${API_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      )
      const forecastData = await forecastResponse.json()
      setForecast(forecastData.list.slice(0, 5))

    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (city.trim()) {
      fetchWeather(city)
    }
  }

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`
  }

  const getBackgroundClass = () => {
    if (!weather) return 'bg-default'
    const main = weather.weather[0].main.toLowerCase()
    if (main.includes('clear')) return 'bg-clear'
    if (main.includes('cloud')) return 'bg-clouds'
    if (main.includes('rain') || main.includes('drizzle')) return 'bg-rain'
    if (main.includes('thunder')) return 'bg-thunder'
    if (main.includes('snow')) return 'bg-snow'
    if (main.includes('mist') || main.includes('fog')) return 'bg-mist'
    return 'bg-default'
  }

  return (
    <div className={`weather-app ${getBackgroundClass()}`}>
      <div className="weather-container">
        <header className="weather-header">
          <h1>Weather App</h1>
          <p className="subtitle">Check weather for any city worldwide</p>
        </header>

        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button type="submit" className="search-btn" disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>

        {loading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Fetching weather data...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠</span>
            <p>{error}</p>
          </div>
        )}

        {weather && !loading && (
          <div className="weather-content">
            <div className="current-weather">
              <div className="weather-main">
                <h2 className="city-name">{weather.name}, {weather.sys.country}</h2>
                <img
                  src={getWeatherIcon(weather.weather[0].icon)}
                  alt={weather.weather[0].description}
                  className="weather-icon"
                />
                <div className="temperature">{Math.round(weather.main.temp)}°C</div>
                <p className="description">
                  {weather.weather[0].description.charAt(0).toUpperCase() + weather.weather[0].description.slice(1)}
                </p>
              </div>

              <div className="weather-details">
                <div className="detail-card">
                  <span className="detail-icon">🌡</span>
                  <p className="detail-label">Feels Like</p>
                  <p className="detail-value">{Math.round(weather.main.feels_like)}°C</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">💧</span>
                  <p className="detail-label">Humidity</p>
                  <p className="detail-value">{weather.main.humidity}%</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">💨</span>
                  <p className="detail-label">Wind Speed</p>
                  <p className="detail-value">{weather.wind.speed} m/s</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">👁</span>
                  <p className="detail-label">Visibility</p>
                  <p className="detail-value">{(weather.visibility / 1000).toFixed(1)} km</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🔽</span>
                  <p className="detail-label">Min Temp</p>
                  <p className="detail-value">{Math.round(weather.main.temp_min)}°C</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🔼</span>
                  <p className="detail-label">Max Temp</p>
                  <p className="detail-value">{Math.round(weather.main.temp_max)}°C</p>
                </div>
              </div>
            </div>

            {forecast && forecast.length > 0 && (
              <div className="forecast-section">
                <h3 className="forecast-title">5-Day Forecast</h3>
                <div className="forecast-grid">
                  {forecast.map((item, index) => (
                    <div key={index} className="forecast-card">
                      <p className="forecast-day">
                        {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <img
                        src={getWeatherIcon(item.weather[0].icon)}
                        alt={item.weather[0].description}
                        className="forecast-icon"
                      />
                      <p className="forecast-temp">{Math.round(item.main.temp)}°C</p>
                      <p className="forecast-desc">{item.weather[0].main}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {!weather && !loading && !error && (
          <div className="initial-state">
            <div className="weather-animation">
              <span className="cloud">☁</span>
              <span className="sun">☀</span>
              <span className="rain">🌧</span>
            </div>
            <p>Search for a city to see the weather</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
