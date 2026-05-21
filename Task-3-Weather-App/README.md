# Weather App

A React weather application that fetches and displays weather data using the OpenWeatherMap API.

🔗 **Live Demo:** [https://suyog-shirsat2004.github.io/CODING-SAMURAI-INTERNSHIP-TASK/weather-app/](https://suyog-shirsat2004.github.io/CODING-SAMURAI-INTERNSHIP-TASK/weather-app/)

## Features

- Search weather for any city worldwide
- Current weather details (temperature, humidity, wind speed, pressure, visibility, etc.)
- 5-day weather forecast
- Sunrise and sunset times
- Dynamic backgrounds based on weather conditions
- Responsive design for all devices
- Saves last searched city in localStorage

## Skills Demonstrated

- **Fetch API** - Asynchronous data fetching from OpenWeatherMap API
- **React Hooks** - `useState` for state management, `useEffect` for side effects
- **Conditional Rendering** - Loading states, error handling, and dynamic UI
- **Environment Variables** - Secure API key management with Vite

## Setup

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api) (takes 2 minutes)
2. Create `.env` file in this folder:
   ```
   VITE_WEATHER_API_KEY=your_api_key_here
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173

## API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `weather?q={city}` | Get current weather data |
| `forecast?q={city}` | Get 5-day/3-hour forecast data |

## Project Structure

```
Task-3-Weather-App/
├── src/
│   ├── App.jsx         # Main component with API integration
│   ├── index.css       # All styling
│   ├── App.css         # Empty (styles in index.css)
│   └── main.jsx        # React entry point
├── .env.example        # Environment variable template
├── index.html          # HTML template
└── package.json        # Dependencies
