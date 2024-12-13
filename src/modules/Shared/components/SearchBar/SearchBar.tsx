import React, { useState } from 'react';
import './SearchBar.css'; 

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = event.target.value;
        setQuery(newQuery);
        onSearch(newQuery); // Call onSearch on every change for instant search
    };

    return (
        <div className="search-bar">
            <button onClick={() => onSearch(query)} className="search-button">
              <i className="fas fa-search"></i> 
            </button>
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search By Title..."
                className="search-input"
            />
        </div>
    );
};

export default SearchBar;