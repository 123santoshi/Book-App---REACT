import React from 'react';
import Home from './Home';
import AddEdit from './AddEdit';
import View from './View';
import { Link } from 'react-router-dom';
import "./style.css";
import "./header.css";

const Header = () => {
  return (
    <div className='Header-Conatiner'>
      <div className='Header-Heading'>
        <h1>Book Store Management App</h1>
      </div>
      <div className='Header-Links'>
        <button><Link to="/">Home</Link></button>
        <button><Link to="/addedit">Add NewBook</Link></button>
        <button><Link to="/contact">Contact</Link></button>
      </div>
    </div>
  );
};

export default Header;
