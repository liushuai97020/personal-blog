import { useState, useEffect } from 'react';
import styles from './WeatherWidget.module.scss';

interface WeatherData {
  temp: number;
  code: number;
  city: string;
}

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  // Mapping weather codes (WMO) to emojis
  const getWeatherIcon = (code: number) => {
    if (code === 0) return '☀️'; // Clear sky
    if (code <= 3) return '🌤️'; // Partly cloudy
    if (code <= 48) return '🌫️'; // Fog
    if (code <= 67) return '🌧️'; // Rain
    if (code <= 77) return '❄️'; // Snow
    if (code <= 82) return '🌦️'; // Showers
    if (code <= 99) return '⛈️'; // Thunderstorm
    return '🌡️';
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Step 1: Get location via IP (ip-api.com is free and no-key)
        const locResponse = await fetch('http://ip-api.com/json/?lang=zh-CN');
        const locData = await locResponse.json();
        
        let lat = 39.9042;
        let lon = 116.4074;
        let city = '北京';

        if (locData.status === 'success') {
          lat = locData.lat;
          lon = locData.lon;
          city = locData.city;
        }
        
        // Step 2: Get weather for these coordinates
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
        );
        const weatherData = await weatherResponse.json();
        
        if (weatherData.current_weather) {
          setWeather({
            temp: Math.round(weatherData.current_weather.temperature),
            code: weatherData.current_weather.weathercode,
            city: city
          });
        }
      } catch (error) {
        console.error('Failed to fetch weather:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading || !weather) {
    return (
      <div className={styles.weatherWidget}>
        <span className={styles.icon}>⌛</span>
        <span className={styles.temp}>--°C</span>
      </div>
    );
  }

  return (
    <div className={styles.weatherWidget} title={`当前城市: ${weather.city}`}>
      <span className={styles.icon}>{getWeatherIcon(weather.code)}</span>
      <span className={styles.temp}>{weather.temp}°C</span>
      <span className={styles.city}>{weather.city}</span>
    </div>
  );
};

export default WeatherWidget;
