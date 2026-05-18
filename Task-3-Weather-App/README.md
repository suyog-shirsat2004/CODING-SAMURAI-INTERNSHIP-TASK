# Weather App

A React weather application that fetches and displays weather data using the OpenWeatherMap API.

## Features

- Search weather for any city worldwide
- Current weather details (temperature, humidity, wind speed, etc.)
- 5-day weather forecast
- Dynamic backgrounds based on weather conditions
- Responsive design for all devices
- Saves last searched city in localStorage

## Skills Demonstrated

- **Fetch API** - Asynchronous data fetching from OpenWeatherMap API
- **React Hooks** - `useState` for state management, `useEffect` for side effects
- **Conditional Rendering** - Loading states, error handling, and dynamic UI
- **Environment Variables** - Secure API key management

## Setup

1. Get a free API key from [OpenWeatherMap](https://openweathermap.org/api)
2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
3. Add your API key to `.env`:
   ```
   VITE_API_KEY=your_api_key_here
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Start the development server:
   ```bash
   npm run dev
   ```

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
```
