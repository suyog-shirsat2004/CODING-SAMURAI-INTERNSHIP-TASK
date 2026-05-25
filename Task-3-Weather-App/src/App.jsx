import React, { useState, useEffect } from 'react'
import './App.css'

const API_URL = 'https://wttr.in'

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
      const response = await fetch(
        `${API_URL}/${encodeURIComponent(cityName)}?format=j1`
      )

      if (!response.ok) {
        throw new Error('Failed to fetch weather data.')
      }

      const data = await response.json()

      if (!data.current_condition || data.current_condition.length === 0) {
        throw new Error('City not found. Please try again.')
      }

      const current = data.current_condition[0]
      const nearestArea = data.nearest_area ? data.nearest_area[0] : {}
      const today = data.weather ? data.weather[0] : {}
      const astronomy = today.astronomy ? today.astronomy[0] : {}

      setWeather({
        cityName: nearestArea.areaName ? nearestArea.areaName[0].value : cityName,
        region: nearestArea.region ? nearestArea.region[0].value : '',
        country: nearestArea.country ? nearestArea.country[0].value : '',
        temperature: current.temp_C,
        feelsLike: current.FeelsLikeC,
        weatherText: current.weatherDesc ? current.weatherDesc[0].value : '',
        weatherCode: current.weatherCode,
        humidity: current.humidity,
        windSpeed: current.windspeedKmph,
        windDir: current.winddir16Point,
        visibility: current.visibility,
        pressure: current.pressure,
        uvIndex: current.uvIndex,
        cloudCover: current.cloudcover,
        precipMM: current.precipMM,
        sunrise: astronomy.sunrise,
        sunset: astronomy.sunset,
        moonPhase: astronomy.moon_phase,
        moonIllumination: astronomy.moon_illumination,
        maxTemp: today.maxtempC,
        minTemp: today.mintempC
      })

      if (data.weather && data.weather.length > 0) {
        const forecastDays = data.weather.slice(0, 3)
        setForecast(forecastDays)
      }

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
    const code = parseInt(weather.weatherCode)

    if (code === 113) return 'bg-clear'
    if (code === 116 || code === 119 || code === 122) return 'bg-clouds'
    if ([176, 263, 266, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356, 359].includes(code)) return 'bg-rain'
    if ([200, 386, 389, 392, 395].includes(code)) return 'bg-thunder'
    if ([179, 182, 185, 227, 230, 323, 326, 329, 332, 335, 338, 350, 362, 365, 368, 371, 374, 377, 392].includes(code)) return 'bg-snow'
    if ([143, 248, 260].includes(code)) return 'bg-mist'
    return 'bg-default'
  }

  const getWeatherEmoji = () => {
    if (!weather) return '🌤'
    const code = parseInt(weather.weatherCode)
    if (code === 113) return '☀️'
    if ([116, 119].includes(code)) return '⛅'
    if (code === 122) return '☁️'
    if ([176, 263, 266, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356, 359].includes(code)) return '🌧️'
    if ([200, 386, 389, 392, 395].includes(code)) return '⛈️'
    if ([179, 182, 185, 227, 230, 323, 326, 329, 332, 335, 338, 350, 362, 365, 368, 371, 374, 377].includes(code)) return '🌨️'
    if ([143, 248, 260].includes(code)) return '🌫️'
    return '🌤️'
  }

  const getForecastEmoji = (code) => {
    if (code === 113) return '☀️'
    if ([116, 119].includes(code)) return '⛅'
    if (code === 122) return '☁️'
    if ([176, 263, 266, 293, 296, 299, 302, 305, 308, 311, 314, 353, 356, 359].includes(code)) return '🌧️'
    if ([200, 386, 389, 392, 395].includes(code)) return '⛈️'
    if ([179, 182, 185, 227, 230, 323, 326, 329, 332, 335, 338, 350, 362, 365, 368, 371, 374, 377].includes(code)) return '🌨️'
    if ([143, 248, 260].includes(code)) return '🌫️'
    return '🌤️'
  }

  return (
    <div className={`weather-app ${getBackgroundClass()}`}>
      <div className="weather-container">
        <header className="weather-header">
          <h1>Weather App</h1>
          <p className="subtitle">Real-time weather data worldwide — powered by wttr.in</p>
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
                <h2 className="city-name">{weather.cityName}{weather.region && `, ${weather.region}`}{weather.country && `, ${weather.country}`}</h2>
                <div className="weather-emoji">{getWeatherEmoji()}</div>
                <div className="temperature">{Math.round(weather.temperature)}°C</div>
                <p className="description">{weather.weatherText}</p>
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
                  <p className="detail-label">Wind</p>
                  <p className="detail-value">{weather.windSpeed} km/h {weather.windDir}</p>
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
                <div className="detail-card">
                  <span className="detail-icon">☁</span>
                  <p className="detail-label">Cloud Cover</p>
                  <p className="detail-value">{weather.cloudCover}%</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🌧</span>
                  <p className="detail-label">Precipitation</p>
                  <p className="detail-value">{weather.precipMM} mm</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🔽</span>
                  <p className="detail-label">Min Temp</p>
                  <p className="detail-value">{Math.round(weather.minTemp)}°C</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🔼</span>
                  <p className="detail-label">Max Temp</p>
                  <p className="detail-value">{Math.round(weather.maxTemp)}°C</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🌅</span>
                  <p className="detail-label">Sunrise</p>
                  <p className="detail-value">{weather.sunrise}</p>
                </div>
                <div className="detail-card">
                  <span className="detail-icon">🌇</span>
                  <p className="detail-label">Sunset</p>
                  <p className="detail-value">{weather.sunset}</p>
                </div>
              </div>
            </div>

            {forecast && forecast.length > 0 && (
              <div className="forecast-section">
                <h3 className="forecast-title">3-Day Forecast</h3>
                <div className="forecast-grid">
                  {forecast.map((day, index) => (
                    <div key={index} className="forecast-card">
                      <p className="forecast-day">
                        {new Date(day.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                      <div className="forecast-emoji">
                        {getForecastEmoji(parseInt(day.hourly[4]?.weatherCode || 113))}
                      </div>
                      <p className="forecast-temp">
                        <span className="max-temp">{Math.round(day.maxtempC)}°</span>
                        <span className="min-temp"> / {Math.round(day.mintempC)}°</span>
                      </p>
                      <p className="forecast-desc">{day.hourly[4]?.weatherDesc[0].value || day.maxtempC}</p>
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
