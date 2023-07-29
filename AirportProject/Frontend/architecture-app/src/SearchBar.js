// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css';

import SearchIcon from './SearchIcon';
const SearchBar = ({ onChange }) => {
  const handleClick = () => {
    // Logic to execute when the button is clicked
    console.log('Button clicked!');
  };
  return (
    <div className="search-bar-container">
      
      <input
        className="search-bar-input"
        type="text"
        placeholder="Search..."
        onChange={(e) => onChange(e.target.value)}
      />
      <div className="search-icon-container">
      <button onClick={handleClick} className="my-button">
      Search
    </button>
      </div>
    </div>
  );
};

export default SearchBar;
