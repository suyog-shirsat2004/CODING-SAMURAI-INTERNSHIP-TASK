import React, { useState, useEffect } from 'react'
import './App.css'

const API_KEY = import.meta.env.VITE_ACCUWEATHER_API_KEY || 'YOUR_ACCUWEATHER_API_KEY_HERE'
const BASE_URL = 'http://dataservice.accuweather.com'

function App() {
  const [city, setCity] = useState('')
  const [weather, setWeather] = useState(null)
  const [forecast, setForecast] = useState(null)
  const [locationKey, setLocationKey] = useState('')
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

  const fetchLocationKey = async (cityName) => {
    const response = await fetch(
      `${BASE_URL}/locations/v1/cities/search?apikey=${API_KEY}&q=${cityName}`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch location data.')
    }

    const data = await response.json()

    if (data.length === 0) {
      throw new Error('City not found. Please try again.')
    }

    return data[0]
  }

  const fetchCurrentWeather = async (key) => {
    const response = await fetch(
      `${BASE_URL}/currentconditions/v1/${key}?apikey=${API_KEY}&details=true`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch weather data.')
    }

    return await response.json()
  }

  const fetchForecast = async (key) => {
    const response = await fetch(
      `${BASE_URL}/forecasts/v1/daily/5day/${key}?apikey=${API_KEY}&metric=true`
    )

    if (!response.ok) {
      throw new Error('Failed to fetch forecast data.')
    }

    return await response.json()
  }

  const fetchWeather = async (cityName) => {
    setLoading(true)
    setError('')
    setWeather(null)
    setForecast(null)
    setLocationKey('')

    try {
      const location = await fetchLocationKey(cityName)
      const key = location.Key

      const [currentData, forecastData] = await Promise.all([
        fetchCurrentWeather(key),
        fetchForecast(key)
      ])

      setLocationKey(key)

      if (currentData.length === 0) {
        throw new Error('Weather data not available for this location.')
      }

      const current = currentData[0]

      setWeather({
        cityName: location.LocalizedName,
        country: location.Country.LocalizedName,
        temperature: current.Temperature.Metric.Value,
        weatherText: current.WeatherText,
        weatherIcon: current.WeatherIcon,
        feelsLike: current.Temperature.Metric.RealFeelValue || current.Temperature.Metric.Value,
        humidity: current.RelativeHumidity,
        windSpeed: current.Wind.Speed.Metric.Value,
        visibility: current.Visibility.Metric.Value,
        uvIndex: current.UVIndex,
        pressure: current.Pressure.Metric.Value,
        hasPrecipitation: current.HasPrecipitation,
        precipitationType: current.PrecipitationType,
        isDayTime: current.IsDayTime,
        iconPhrase: current.IconPhrase
      })

      setForecast(forecastData.DailyForecasts)

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
    const iconPhrase = weather.iconPhrase.toLowerCase()

    if (text.includes('clear') || text.includes('sunny') || iconPhrase.includes('clear') || iconPhrase.includes('sunny')) return 'bg-clear'
    if (text.includes('cloud') || iconPhrase.includes('cloud')) return 'bg-clouds'
    if (text.includes('rain') || text.includes('shower') || iconPhrase.includes('rain')) return 'bg-rain'
    if (text.includes('thunder') || text.includes('storm') || iconPhrase.includes('thunder')) return 'bg-thunder'
    if (text.includes('snow') || iconPhrase.includes('snow')) return 'bg-snow'
    if (text.includes('fog') || text.includes('mist') || iconPhrase.includes('fog')) return 'bg-mist'
    return 'bg-default'
  }

  const getWeatherEmoji = () => {
    if (!weather) return '🌤'
    const text = weather.weatherText.toLowerCase()
    const iconPhrase = weather.iconPhrase.toLowerCase()

    if (text.includes('clear') || text.includes('sunny')) return '☀️'
    if (text.includes('cloud')) return '☁️'
    if (text.includes('rain') || text.includes('shower')) return '🌧️'
    if (text.includes('thunder') || text.includes('storm')) return '⛈️'
    if (text.includes('snow')) return '🌨️'
    if (text.includes('fog') || text.includes('mist')) return '🌫️'
    return '🌤️'
  }

  return (
    <div className={`weather-app ${getBackgroundClass()}`}>
      <div className="weather-container">
        <header className="weather-header">
          <h1>Weather App</h1>
          <p className="subtitle">Powered by AccuWeather API</p>
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
            <p>Fetching weather data from AccuWeather...</p>
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
                <p className="description">{weather.weatherText}</p>
                {!weather.isDayTime && <span className="night-badge">🌙 Night Time</span>}
              </div>

              <div className="weather-details">
                <div className="detail-card">
                  <span className="detail-icon">🌡</span>
                  <p className="detail-label">Real Feel</p>
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
                  <p className="detail-value">{weather.windSpeed} km/h</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">👁</span>
                  <p className="detail-label">Visibility</p>
                  <p className="detail-value">{weather.visibility} km</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">☀</span>
                  <p className="detail-label">UV Index</p>
                  <p className="detail-value">{weather.uvIndex}</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🔵</span>
                  <p className="detail-label">Pressure</p>
                  <p className="detail-value">{weather.pressure} mb</p>
                </div>
              </div>
            </div>

            {forecast && forecast.length > 0 && (
              <div className="forecast-section">
                <h3 className="forecast-title">5-Day Forecast</h3>
                <div className="forecast-grid">
                  {forecast.map((day, index) => (
                    <div key={index} className="forecast-card">
                      <p className="forecast-day">
                        {new Date(day.Date).toLocaleDateString('en-US', { weekday: 'short' })}
                      </p>
                      <div className="forecast-emoji">
                        {day.Day.IconPhrase.toLowerCase().includes('sun') || day.Day.IconPhrase.toLowerCase().includes('clear') ? '☀️' :
                         day.Day.IconPhrase.toLowerCase().includes('cloud') ? '☁️' :
                         day.Day.IconPhrase.toLowerCase().includes('rain') ? '🌧️' :
                         day.Day.IconPhrase.toLowerCase().includes('snow') ? '🌨️' : '🌤️'}
                      </div>
                      <p className="forecast-temp">
                        <span className="max-temp">{Math.round(day.Temperature.Maximum.Value)}°</span>
                        <span className="min-temp"> / {Math.round(day.Temperature.Minimum.Value)}°</span>
                      </p>
                      <p className="forecast-desc">{day.Day.ShortPhrase}</p>
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
