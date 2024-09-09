// import React, { useEffect, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import summaryApi from '../common';
// import RecipeCard from './RecipeCard';

// const RecipeContainer = ({ filter }) => {
//   const [recipes, setRecipes] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1); 
//   const [error, setError] = useState(null);
//   const itemsPerPage = 10;
//   const { searchQuery } = useOutletContext();

//   useEffect(() => {
//     const fetchRecipes = async () => { 
//       setError(null);
//       try {
//         const searchParams = new URLSearchParams({
//           page: currentPage,
//           size: itemsPerPage,
//         });

//         if (searchQuery) {
//           searchParams.append('q', searchQuery);
//         }

//         if (filter && Object.keys(filter).length > 0) {
//           Object.entries(filter).forEach(([key, value]) => {
//             if (value) searchParams.append(key, value);
//           });
//         }

//         const endpoint = Object.keys(filter).length > 0 ? '/filter' : '/search';
//         const url = `${summaryApi.recipeURL.url}${endpoint}?${searchParams.toString()}`;

//         console.log('Fetching from URL:', url); // Debug log

//         const response = await fetch(url, {
//           method: summaryApi.recipeURL.method,
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         const data = await response.json();
//         console.log('Fetched data:', data); // Debug log

//         if (!response.ok) {
//           throw new Error(data.message || 'Failed to fetch recipes');
//         }

//         // Adjust according to your API response structure
//         const totalItems = data.total || data.length || 0;
//         setRecipes(data.recipes || data);
//         setTotalPages(Math.ceil(totalItems / itemsPerPage));
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setError(error.message || 'An error occurred');
//         setRecipes([]);
//       } finally {
//         // setLoading(false);
//       }
//     };

//     fetchRecipes();
//   }, [currentPage, searchQuery, filter]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prevPage => prevPage + 1);
//     }
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(prevPage => prevPage - 1);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {/* {loading && <div>Loading recipes...</div>} */}
//       {error && <div className="text-red-500">{error}</div>}
//       {  !error && (
//         <div className="flex flex-wrap md:p-4">
//           {recipes.length > 0 ? (
//             recipes.map((recipe, index) => (
//               <RecipeCard key={index} info={recipe._source || recipe} />
//             ))
//           ) : (
//             <p>No recipes found.</p>
//           )}
//         </div>
//       )}
//       {recipes.length > 0 && (
//         <div className="mt-4">
//           <button
//             onClick={handlePreviousPage}
//             disabled={currentPage === 1}
//             className="mr-2 p-2 border border-black hover:bg-red-400 rounded-lg"
//           >
//             Prev
//           </button>
//           <span className="mx-3 p-2 text-white bg-black rounded-md">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}
//             className="ml-2 p-2 border border-black hover:bg-green-400 rounded-lg"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecipeContainer;

import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import summaryApi from '../common';
import RecipeCard from './RecipeCard';   
import CategoryFilter from './CategoriesFilter';

const RecipeContainer = () => {
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState({});  
  const itemsPerPage = 10;
  const { searchQuery } = useOutletContext();

  useEffect(() => {

    // const fetchRecipes = async () => {
    //   setError(null);
    //   try {
    //     const searchParams = new URLSearchParams({
    //       page: currentPage,
    //       size: itemsPerPage,
    //     });
  
    //     if (searchQuery) {
    //       searchParams.append('q', searchQuery);
    //     }
  
    //     if (filter && Object.keys(filter).length > 0) {
    //       Object.entries(filter).forEach(([key, value]) => {
    //         if (Array.isArray(value)) {
    //           value.forEach(val => searchParams.append(key, val));
    //         } else if (value) {
    //           searchParams.append(key, value);
    //         }
    //       });
    //     }
  
    //     const endpoint = Object.keys(filter).length > 0 ? '/filter' : '/search';
    //     const url = `${summaryApi.recipeURL.url}${endpoint}?${searchParams.toString()}`;
  
    //     console.log('Fetching from URL:', url); 
  
    //     const response = await fetch(url, {
    //       method: summaryApi.recipeURL.method,
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     });
  
    //     if (!response.ok) {
    //       throw new Error(`HTTP error! Status: ${response.status}`);
    //     }
  
    //     const data = await response.json();
    //     console.log('Fetched data:', data);  
  
    //     setRecipes(data.recipes || []);
    //     setTotalPages(Math.ceil(data.total / itemsPerPage));
    //   } catch (error) {
    //     console.error('Error fetching recipes:', error);
    //     setError(error.message || 'An error occurred');
    //     setRecipes([]);
    //   }
    // };
    
    const fetchRecipes = async () => {
      setError(null);
      try {
        const searchParams = new URLSearchParams({
          page: currentPage,
          size: itemsPerPage,
        });
    
        if (searchQuery) {
          searchParams.append('q', searchQuery);
        }
    
        if (filter && Object.keys(filter).length > 0) {
          Object.entries(filter).forEach(([key, value]) => {
            if (Array.isArray(value)) {
              value.forEach(val => searchParams.append(key, val));
            } else if (value) {
              searchParams.append(key, value);
            }
          });
        }
    
        const url = `${summaryApi.recipeURL.url}/search?${searchParams.toString()}`;
    
        console.log('Fetching from URL:', url); // Debug log
    
        const response = await fetch(url, {
          method: summaryApi.recipeURL.method,
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Fetched data:', data); // Debug log
    
        setRecipes(data.recipes || []);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError(error.message || 'An error occurred');
        setRecipes([]);
      }
    };
    
    
    fetchRecipes();
  }, [currentPage, searchQuery, filter]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };


  const handleKeywordFilterChange = (selectedKeywords) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      categories: selectedKeywords.length > 0 ? selectedKeywords : undefined
    }));
  };
  


  return (
    <div className="flex flex-col items-center">
      <CategoryFilter onFilterChange={handleKeywordFilterChange} />  

      
      {error && <div className="text-red-500">{error}</div>}
      { !error && (
        <div className="flex flex-wrap md:p-4">
          {recipes.length > 0 ? (
            recipes.map((recipe, index) => (
              <RecipeCard key={index} info={recipe._source || recipe} />
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      )}
      {recipes.length > 0 && (
        <div className="mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="mr-2 p-2 border border-black hover:bg-red-400 rounded-lg"
          >
            Prev
          </button>
          <span className="mx-3 p-2 text-white bg-black rounded-md">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="ml-2 p-2 border border-black hover:bg-green-400 rounded-lg"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default RecipeContainer;
