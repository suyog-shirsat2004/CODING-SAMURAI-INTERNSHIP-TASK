# Weather App

A React weather application that fetches and displays weather data using the AccuWeather API.

## Features

- Search weather for any city worldwide
- Current weather details (temperature, humidity, wind speed, UV index, pressure, etc.)
- 5-day weather forecast with day/night indicators
- Dynamic backgrounds based on weather conditions
- Responsive design for all devices
- Saves last searched city in localStorage
- Fetches data using Promise.all for optimized performance

## Skills Demonstrated

- **Fetch API** - Asynchronous data fetching from AccuWeather API
- **React Hooks** - `useState` for state management, `useEffect` for side effects
- **Conditional Rendering** - Loading states, error handling, and dynamic UI
- **Environment Variables** - Secure API key management with Vite

## Setup

1. Get a free API key from [AccuWeather Developer Portal](https://developer.accuweather.com/)
2. Copy `.env.example` to `.env`:
   ```bash
   copy .env.example .env
   ```
3. Add your API key to `.env`:
   ```
   VITE_ACCUWEATHER_API_KEY=your_api_key_here
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints Used

| Endpoint | Purpose |
|----------|---------|
| `locations/v1/cities/search` | Get location key for a city |
| `currentconditions/v1/{key}` | Get current weather conditions |
| `forecasts/v1/daily/5day/{key}` | Get 5-day daily forecast |

## Project Structure

```
Task-3-Weather-App/
├── src/
│   ├── App.jsx         # Main component with AccuWeather API integration
│   ├── index.css       # All styling
│   ├── App.css         # Empty (styles in index.css)
│   └── main.jsx        # React entry point
├── .env.example        # Environment variable template
├── index.html          # HTML template
└── package.json        # Dependencies
```
