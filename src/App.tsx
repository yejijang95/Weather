import React, { useState, useEffect } from 'react'
import './App.css'

const CITIES = {
  'San Francisco': {'latitude': 37.7749, 'longitude': -122.4194},
  'New York': {'latitude': 40.7128, 'longitude': -74.0060},
  'Seattle': {'latitude': 47.6061, 'longitude': -122.3328},
  'St. Louis': {'latitude': 38.6270, 'longitude': -90.1994},
  'Honolulu': {'latitude': 21.3099, 'longitude': -157.8581},
  'Anchorage': {'latitude': 38.6270, 'longitude': -90.1994},
  'Chicago': {'latitude': 41.87810, 'longitude': -87.6298},
  'Denver': {'latitude': 39.7392, 'longitude': -104.9903},
  'Atlanta': {'latitude': 33.7488, 'longitude': -84.3877},
}

const ICONS = {
  'cloudy': 'https://upload.wikimedia.org/wikipedia/commons/4/40/Draw_cloudy.png',
  'fog': 'https://cdn-icons-png.flaticon.com/512/990/990395.png',
  'freezing rain': "https://static.thenounproject.com/png/13552-200.png",
  'hail': "https://cdn-icons-png.flaticon.com/512/5782/5782377.png",
  'light rain': "https://cdn-icons-png.flaticon.com/512/8841/8841410.png",
  'light thunderstorms': "https://static.vecteezy.com/system/resources/previews/012/806/419/original/3d-cartoon-weather-thunderstorm-lightning-light-cloud-sign-with-lightning-isolated-on-transparent-background-3d-render-illustration-png.png",
  'mostly cloudy': "https://static-00.iconduck.com/assets.00/partly-cloudy-icon-2048x2017-psuzmzww.png",
  'mostly sunny': "https://static-00.iconduck.com/assets.00/partly-cloudy-icon-2048x2017-psuzmzww.png",
  'rain': "https://png.pngtree.com/png-vector/20190719/ourlarge/pngtree-rain-icon-png-image_1558221.jpg",
  'slight cloudy': "https://static.thenounproject.com/png/141499-200.png",
 'snow': "https://www.freepnglogos.com/uploads/snow-clipart/snow-cliparts-transparent-download-clip-art-32.png",
  'sunny': 'https://cdn-icons-png.flaticon.com/512/2580/2580627.png',
  'sunshowers': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQd33_2LvMM7ZXr5UA_srkZmtiItWuaqbtuzg&usqp=CAU',
  'thunderstorm': 'https://cdn-icons-png.flaticon.com/512/5903/5903432.png',
}

function App() {
  const [selectedCity, setSelectedCity] = useState('San Francisco');
  const [temperature, setTemperature] = useState(null);
  const [icon, setIcon] = useState(null);

  const updateForecast = (city) => {
    setSelectedCity(city);
    fetch(`https://api.weather.gov/points/${CITIES[city].latitude},${CITIES[city].longitude}`).then(response => response.json()).then(data => {
      const forecastEndpoint = data.properties.forecast;
      fetch(forecastEndpoint).then(response => response.json()).then(data => {
        setTemperature(data.properties.periods[0].temperature);
        const shortForecast = data.properties.periods[0].shortForecast.toLowerCase();
        if (shortForecast.substring(0, 7) === 'chance ') {
          setIcon(ICONS[shortForecast.substring(7)]);
        } else {
          setIcon(ICONS[shortForecast]);
        }
      })
    })
  }

  useEffect(() => {
    const city = selectedCity;
    updateForecast(city);

  }, [selectedCity]);

  return (
    <div>
    <h4>Simple Weather App</h4>
    <p><strong>PICK LOCATION</strong></p>
    <div className="select-wrapper">
    <select name="city" onChange={(e) => updateForecast(e.target.value)}>
        <option value="San Francisco" selected>San Francisco</option>
        <option value="New York">New York</option>
        <option value="Seattle">Seattle</option>
        <option value="Honolulu">Honolulu</option>
        <option value="Chicago">Chicago</option>
        <option value="Anchorage">Anchorage</option>
        <option value="Denver">Denver</option>
        <option value="Atlanta">Atlanta</option>
      </select>
    </div>
      <p><strong>WEATHER</strong></p>
      <div className="weather-details">
        <h2>{temperature}°</h2>
        <img className="weather-icon" src={icon} />
      </div>
    </div>
  )
}

export default App

