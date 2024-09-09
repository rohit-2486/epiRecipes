// src/components/CategoryFilter.jsx
import React, { useState, useEffect } from 'react';

const CategoryFilter = ({ onFilterChange }) => {
  const keywords = ['Healthy', 'Garlic', 'Herb', 'Salad', 'Egg', 'Chicken', 'Vegetarian'];
  const [showFilterOptions, setShowFilterOptions] = useState(false);
  const [selectedKeywords, setSelectedKeywords] = useState(['All']);
 
  useEffect(() => {
    if (selectedKeywords.length === 0) {
      setSelectedKeywords(['All']);
    }
  }, [selectedKeywords]);

  // Handle the change when a keyword checkbox is clicked
  const handleKeywordChange = (keyword) => {
    if (keyword === 'All') {
      setSelectedKeywords(['All']); 
      onFilterChange([]); 
    } else {
      let updatedKeywords = selectedKeywords.includes(keyword)
        ? selectedKeywords.filter((k) => k !== keyword)
        : [...selectedKeywords.filter((k) => k !== 'All'), keyword];

      if (updatedKeywords.length === 0) {
        updatedKeywords = ['All'];
      }

      setSelectedKeywords(updatedKeywords);
      onFilterChange(updatedKeywords.filter((k) => k !== 'All'));  
    }
  };

  return (
    <div className="category-filter p-2 border mt-3 rounded-md bg-white shadow-md">
      {/* <h4 className="font-semibold mb-2">Filter by Keywords</h4> */}

     
      <button
        className="mt-2 px-2 pb-2 bg-blue-500 text-white rounded-md"
        onClick={() => setShowFilterOptions(!showFilterOptions)}
      >
        {showFilterOptions ? 'Hide Filters' : 'Show Filters'}
      </button>

       
      {showFilterOptions && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          {/* "All" option */}
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value="All"
              checked={selectedKeywords.includes('All')}
              onChange={() => handleKeywordChange('All')}
            />
            <span>All</span>
          </label>

          {/* Keywords checkboxes */}
          {keywords.map((keyword) => (
            <label key={keyword} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={keyword}
                checked={selectedKeywords.includes(keyword)}
                onChange={() => handleKeywordChange(keyword)}
              />
              <span>{keyword}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;
