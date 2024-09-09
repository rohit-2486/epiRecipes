import React, { useState } from 'react';
import RecipeContainer from '../components/RecipeContainer';
import ButtonList from '../components/ButtonList';

const Home = () => {
  const [filter, setFilter] = useState({});

  const handleFilterChange = (filterType) => {
    switch (filterType) {
      case 'rating':
        // Toggle rating filter
        setFilter((prev) => ({
          ...prev,
          rating: prev.rating ? undefined : 4.3,  // Example rating threshold
        }));
        break;
      case 'veg':
        // Toggle veg filter
        setFilter((prev) => ({
          ...prev,
          veg: prev.veg ? undefined : true,
        }));
        break;
    
      default:
        break;
    }
  };

  return (
    <div>
      <ButtonList onFilter={handleFilterChange} />
      <RecipeContainer filter={filter} />
    </div>
  );
};

export default Home;

