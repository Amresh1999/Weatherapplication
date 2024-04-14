import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CitiesTable from './components/CitiesTable';
import CityWeather from './components/CityWeather';
import LandingPage from './components/LandingPage';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/cities" element={<CitiesTable />} />
        <Route path="/weather/:cityName" element={<CityWeather />} />
      </Routes>
    </Router>
  );
}

export default App;
