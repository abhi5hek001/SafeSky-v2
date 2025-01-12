import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from './ui/skeleton';

const Map = dynamic(() => import('@/components/map'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
      Loading map...
    </div>
  ),
});

interface WeatherData {
  temperature: string;
  feelsLike: string;
  humidity: string;
  precipitation: string;
  windSpeed: string;
  windDirection: string;
}

interface WeatherReportProps {
  lat: number;
  lon: number;
}

export default function WeatherReport({ lat, lon }: WeatherReportProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GEOCODING_API_KEY;

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;
        const response = await fetch(currentWeatherUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();

        const weather: WeatherData = {
          temperature: (data.main.temp - 273.15).toFixed(2) + '°C', // Convert Kelvin to Celsius
          feelsLike: (data.main.feels_like - 273.15).toFixed(2) + '°C',
          humidity: data.main.humidity + '%',
          precipitation: data.rain ? `${data.rain['1h']} mm` : '0 mm',
          windSpeed: data.wind.speed + ' m/s',
          windDirection: data.wind.deg + '°',
        };

        setWeatherData(weather);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [lat, lon]);

  return (
    <div className="w-[600px] text-white relative mt-20 mx-30 top-[10vh] sm:top-[20vh] md:top-[20vh] lg:top-[5vh] p-4 backdrop-blur-sm rounded-lg shadow-lg">
      <Map lat={lat} lon={lon} />
      <div className="mt-10">
        <h4 className="text-lg text-white font-bold mb-2">Weather Details</h4>
        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          weatherData && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Temperature: {weatherData.temperature}</p>
              <p className="text-sm font-medium">Feels Like: {weatherData.feelsLike}</p>
              <p className="text-sm font-medium">Humidity: {weatherData.humidity}</p>
              <p className="text-sm font-medium">Precipitation: {weatherData.precipitation}</p>
              <p className="text-sm font-medium">Wind Speed: {weatherData.windSpeed}</p>
              <p className="text-sm font-medium">Wind Direction: {weatherData.windDirection}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
}
