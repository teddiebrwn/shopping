import React, { useState } from 'react';
import './Search.css';

function SearchPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Xử lý logic tìm kiếm - hiện tại đang hiển thị không có kết quả
    setResults(["No results found"]);
  };

  return (
    <div className="search-container">
      {/* Hộp tìm kiếm */}
      <div className="search-box">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="search-button" onClick={handleSearch}>Search</button>
      </div>

      {/* Kết quả tìm kiếm */}
      <div className="search-results">
        {results.map((result, index) => (
          <p key={index}>{result}</p>
        ))}
      </div>
    </div>
  );
}

export default SearchPage;
