 
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const RecipeCard = ({ info }) => {
  const [showMoreIngredients, setShowMoreIngredients] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const maxIngredientsToShow = 3; // Limit to 3 ingredients
  const maxCategoriesToShow = 3; // Limit to 3 categories

  const handleShowMoreIngredients = () => {
    setShowMoreIngredients(!showMoreIngredients);
  };

  const handleShowMoreCategories = () => {
    setShowMoreCategories(!showMoreCategories);
  };

  return (
    <div className="recipe-card border rounded p-4 m-5 bg-white shadow-md w-64 h-auto overflow-hidden">
      {info.image && (
        <img
          src={info.image || 'default-image.jpg'} // Placeholder image if no image is provided
          alt={info.title}
          className="w-full h-32 object-cover rounded"
        />
      )}
      <h2 className="text-xl font-bold mt-2 hover:bg-red-400 bg-red-200 truncate">
        {info.title}
      </h2>
      <p className="text-gray-700 text-sm mt-1 truncate">
        {info.desc || 'No description available'}
      </p>
      <div className="mt-2">
        <strong>Rating:</strong> {info.rating || 'N/A'}
      </div>

      {info.categories && info.categories.length > 0 && (
        <div className="mt-2">
          <strong>Categories:</strong>
          <ul className="max-h-24 overflow-y-auto">
            {info.categories.slice(0, maxCategoriesToShow).map((category, index) => (
              <li key={index} className="text-sm">
                {category}
              </li>
            ))}
            {info.categories.length > maxCategoriesToShow && (
              <li>
                <button
                  onClick={handleShowMoreCategories}
                  className="text-blue-500 underline text-sm"
                >
                  {showMoreCategories ? 'Show Less' : 'Show More'}
                </button>
                {showMoreCategories && (
                  <ul className="mt-2">
                    {info.categories.slice(maxCategoriesToShow).map((category, index) => (
                      <li key={index} className="text-sm">
                        {category}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      )}

      {info.ingredients && info.ingredients.length > 0 && (
        <div className="mt-2">
          <strong>Ingredients:</strong>
          <ul className="max-h-24 overflow-y-auto">
            {info.ingredients.slice(0, maxIngredientsToShow).map((ingredient, index) => (
              <li key={index} className="text-sm">
                {ingredient}
              </li>
            ))}
            {info.ingredients.length > maxIngredientsToShow && (
              <li>
                <button
                  onClick={handleShowMoreIngredients}
                  className="text-blue-500 underline text-sm"
                >
                  {showMoreIngredients ? 'Show Less' : 'Show More'}
                </button>
                {showMoreIngredients && (
                  <ul className="mt-2">
                    {info.ingredients.slice(maxIngredientsToShow).map((ingredient, index) => (
                      <li key={index} className="text-sm">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

RecipeCard.propTypes = {
  info: PropTypes.shape({
    title: PropTypes.string.isRequired,
    desc: PropTypes.string,
    image: PropTypes.string,
    rating: PropTypes.number,
    categories: PropTypes.arrayOf(PropTypes.string),
    ingredients: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

RecipeCard.defaultProps = {
  info: {
    desc: 'No description available',
    rating: 'N/A',
    categories: [],
    ingredients: [],
  },
};

export default RecipeCard;
