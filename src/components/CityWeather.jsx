import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/style.css';

const getBackgroundClass = (weather) => {
    if (!weather) return 'bg-neutral';

    const temp = weather.main.temp;
    const mainCondition = weather.weather[0].main.toLowerCase();

    if (temp > 30) {
        return 'bg-hot';
    } else if (temp < 5) {
        return 'bg-cold';
    } else if (mainCondition.includes('rain')) {
        return 'bg-rainy';
    } else if (mainCondition.includes('clear')) {
        return 'bg-sunny';
    } else {
        return 'bg-cloudy';
    }
}
const CityWeather = ({apiKey}) => {
    const { cityName } = useParams();
    const [weather, setWeather] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [backgroundClass, setBackgroundClass] = useState('bg-neutral');

    useEffect(() => {
        const fetchWeather = async () => {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
            try {
                const response = await axios.get(url);
                setWeather(response.data);
                setBackgroundClass(getBackgroundClass(response.data));
            } catch (error) {
                console.error('Error fetching weather data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchWeather();
    }, [cityName, apiKey]);

    if (isLoading) return <p>Loading weather data...</p>;
    if (!weather) return <p  style={{marginLeft:'35rem', marginTop:'20rem', fontSize:'2rem', color:'bold black'}}>No weather data available.</p>;


    return (
        <div className={`city-weather ${backgroundClass}`}>
            <h1>Weather in {cityName}</h1>
            <div className="details-row">
            <div style={{marginLeft:'4rem'}}>
                <h2>Temperature Details:</h2>
                <p>Current Temperature: {weather.main.temp}°C</p>
                <p>Feels Like: {weather.main.feels_like}°C</p>
                <p>Minimum Temperature: {weather.main.temp_min}°C</p>
                <p>Maximum Temperature: {weather.main.temp_max}°C</p>
                <p>Pressure: {weather.main.pressure} hPa</p>
                <p>Humidity: {weather.main.humidity}%</p>
            </div>
           
            <div style={{marginRight:'4rem'}} >
                <h2>Weather Conditions:</h2>
                {weather.weather.map((cond, index) => (
                    <div key={index}>
                        <p>Main: {cond.main}</p>
                        <p>Description: {cond.description}</p>
                        <p>Icon: </p><img src={`http://openweathermap.org/img/w/${cond.icon}.png`} alt="Weather Icon" style={{height:'7rem', marginTop: '-2rem'}}/>
                    </div>
                ))}
            </div>
            </div>
            <div className="details-row">
            <div className="section">
                <h2>Wind Details:</h2>
                <p>Speed: {weather.wind.speed} meter/sec</p>
                <p>Direction: {weather.wind.deg} degrees</p>
            </div>
            <div className="section">
                <h2>Additional Info:</h2>
                <p>Cloudiness: {weather.clouds.all}%</p>
                <p>Visibility: {weather.visibility} meters</p>
            </div>
            <div className="section">
                <h2>Geographical:</h2>
                <p>Longitude: {weather.coord.lon}</p>
                <p>Latitude: {weather.coord.lat}</p>
            </div>
            <div className="section">
                <h2>Sunrise & Sunset:</h2>
                <p>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
        </div>
        </div>
    );
};

export default CityWeather;
