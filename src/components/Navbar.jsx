import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/style.css';
import logo from '../logo.png';

const Navbar = () => {
    return (
        <div className="navbar">
            <Link to="/" className="navbar-logo">
                <img src={logo} alt="WeatherForcasting Logo" style={{ height: '50px' }} />
                <h1 style={{color:'whitesmoke'}}>Weather Forecasting</h1>
            </Link>
            <div className="nav-items">
                <Link to="/cities" className="nav-link">Cities Table</Link>
            </div>
        </div>
    );
};

export default Navbar;
