import React, { useState, useEffect } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY || 'YOUR_API_KEY_HERE'
const BASE_URL = 'https://api.openweathermap.org/data/2.5'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const savedCity = localStorage.getItem('lastSearchedCity')
    if (savedCity) {
      setCity(savedCity)
      fetchWeather(savedCity)
    }
  }, [])

  useEffect(() => {
    if (weather && weather.cityName) {
      localStorage.setItem('lastSearchedCity', weather.cityName)
    }
  }, [weather])

  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError('')
    setWeather(null)
    setForecast(null)

    try {
      const weatherRes = await fetch(
        `${BASE_URL}/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      )

      if (!weatherRes.ok) {
        const errorData = await weatherRes.json()
        throw new Error(errorData.message === 'city not found' ? 'City not found. Please try again.' : 'Failed to fetch weather data.')
      }

      const weatherData = await weatherRes.json()

      const forecastRes = await fetch(
        `${BASE_URL}/forecast?q=${cityName}&appid=${API_KEY}&units=metric`
      )
      const forecastData = await forecastRes.json()

      setWeather({
        cityName: weatherData.name,
        country: weatherData.sys.country,
        temperature: weatherData.main.temp,
        weatherText: weatherData.weather[0].description,
        weatherIcon: weatherData.weather[0].icon,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
        visibility: weatherData.visibility / 1000,
        pressure: weatherData.main.pressure,
        tempMin: weatherData.main.temp_min,
        tempMax: weatherData.main.temp_max,
        sunrise: weatherData.sys.sunrise,
        sunset: weatherData.sys.sunset,
        isDayTime: Date.now() >= weatherData.sys.sunrise * 1000 && Date.now() <= weatherData.sys.sunset * 1000
      })

      const uniqueDays = []
      const seenDates = new Set()
      for (const item of forecastData.list) {
        const date = new Date(item.dt * 1000).toDateString()
        if (!seenDates.has(date)) {
          seenDates.add(date)
          uniqueDays.push(item)
        }
        if (uniqueDays.length === 5) break
      }
      setForecast(uniqueDays)

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

  const getBackgroundClass = () => {
    if (!weather) return 'bg-default'
    const text = weather.weatherText.toLowerCase()

    if (text.includes('clear') || text.includes('sunny')) return 'bg-clear'
    if (text.includes('cloud')) return 'bg-clouds'
    if (text.includes('rain') || text.includes('drizzle')) return 'bg-rain'
    if (text.includes('thunder')) return 'bg-thunder'
    if (text.includes('snow')) return 'bg-snow'
    if (text.includes('mist') || text.includes('fog')) return 'bg-mist'
    return 'bg-default'
  }

  const getWeatherEmoji = () => {
    if (!weather) return '🌤'
    const text = weather.weatherText.toLowerCase()
    if (text.includes('clear') || text.includes('sunny')) return '☀️'
    if (text.includes('cloud')) return '☁️'
    if (text.includes('rain') || text.includes('drizzle')) return '🌧️'
    if (text.includes('thunder')) return '⛈️'
    if (text.includes('snow')) return '🌨️'
    if (text.includes('mist') || text.includes('fog')) return '🌫️'
    return '🌤️'
  }

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  return (
    <div className={`weather-app ${getBackgroundClass()}`}>
      <div className="weather-container">
        <header className="weather-header">
          <h1>Weather App</h1>
          <p className="subtitle">Powered by OpenWeatherMap API</p>
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
                <h2 className="city-name">{weather.cityName}, {weather.country}</h2>
                <div className="weather-emoji">{getWeatherEmoji()}</div>
                <div className="temperature">{Math.round(weather.temperature)}°C</div>
                <p className="description">{weather.weatherText.charAt(0).toUpperCase() + weather.weatherText.slice(1)}</p>
              </div>

              <div className="weather-details">
                <div className="detail-card">
                  <span className="detail-icon">🌡</span>
                  <p className="detail-label">Feels Like</p>
                  <p className="detail-value">{Math.round(weather.feelsLike)}°C</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">💧</span>
                  <p className="detail-label">Humidity</p>
                  <p className="detail-value">{weather.humidity}%</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">💨</span>
                  <p className="detail-label">Wind Speed</p>
                  <p className="detail-value">{weather.windSpeed} m/s</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">👁</span>
                  <p className="detail-label">Visibility</p>
                  <p className="detail-value">{weather.visibility.toFixed(1)} km</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🔽</span>
                  <p className="detail-label">Min Temp</p>
                  <p className="detail-value">{Math.round(weather.tempMin)}°C</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🔼</span>
                  <p className="detail-label">Max Temp</p>
                  <p className="detail-value">{Math.round(weather.tempMax)}°C</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🔵</span>
                  <p className="detail-label">Pressure</p>
                  <p className="detail-value">{weather.pressure} hPa</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🌅</span>
                  <p className="detail-label">Sunrise</p>
                  <p className="detail-value">{formatTime(weather.sunrise)}</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🌇</span>
                  <p className="detail-label">Sunset</p>
                  <p className="detail-value">{formatTime(weather.sunset)}</p>
                </div>
              </div>
            </div>

            {forecast && forecast.length > 0 && (
              <div className="forecast-section">
                <h3 className="forecast-title">5-Day Forecast</h3>
                <div className="forecast-grid">
                  {forecast.map((day, index) => {
                    const iconCode = day.weather[0].icon
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
                    return (
                      <div key={index} className="forecast-card">
                        <p className="forecast-day">
                          {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                        </p>
                        <img src={iconUrl} alt={day.weather[0].description} className="forecast-icon" />
                        <p className="forecast-temp">{Math.round(day.main.temp)}°C</p>
                        <p className="forecast-desc">{day.weather[0].main}</p>
                      </div>
                    )
                  })}
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
