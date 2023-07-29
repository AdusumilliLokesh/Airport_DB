// src/components/SearchBar.js
import React from 'react';
import './SearchBar.css'
const SearchBar = ({ onChange }) => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar-input"
        placeholder="Registration Number..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
