


//this 
// import React, { useEffect, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import summaryApi from '../common';
// import RecipeCard from './RecipeCard';

// const RecipeContainer = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   const { searchQuery } = useOutletContext();

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         const searchParams = new URLSearchParams({
//           from: (currentPage - 1) * itemsPerPage,
//           size: itemsPerPage,
//         });

//         if (searchQuery) {
//           searchParams.append('q', searchQuery);
//         }

//         const response = await fetch(
//           `${summaryApi.recipeURL.url}${searchQuery ? '/search' : ''}?${searchParams.toString()}`,
//           // `${summaryApi.recipeURL.url}/search?${searchParams.toString()}`,

//           {
//             method: summaryApi.recipeURL.method,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         const data = await response.json();

//         setRecipes(data.recipes || data); // Adjust based on API response
//         setTotalPages(Math.ceil((data.total || data.length) / itemsPerPage));
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setRecipes([]);
//       }
//     };

//     fetchRecipes();
//   }, [currentPage, searchQuery]);

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePreviousPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex flex-wrap md:p-4 mt-28">
//         {recipes.length > 0 ? (
//           recipes.map((recipe, index) => (
//             <RecipeCard key={index} info={recipe._source || recipe} />
//           ))
//         ) : (
//           <p>No recipes found.</p>
//         )}
//       </div>
//       <div className="mt-4">
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}
//           className="mr-2 p-2 border border-black hover:bg-red-400 rounded-lg"
//         >
//           Prev
//         </button>
//         <span className="mx-3 p-2 text-white bg-black rounded-md">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//           className="ml-2 p-2 border border-black hover:bg-green-400 rounded-lg"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecipeContainer;


// searching full
// import React, { useEffect, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import summaryApi from '../common';
// import RecipeCard from './RecipeCard';

// const RecipeContainer = () => {
//   const [recipes, setRecipes] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);  // Total number of pages
//   const [currentPage, setCurrentPage] = useState(1);  // Current page
//   const itemsPerPage = 10;  // Number of items per page

//   const { searchQuery } = useOutletContext();  // Search query from context

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         // Create search parameters
//         const searchParams = new URLSearchParams({
//           page: currentPage,  // Current page number
//           size: itemsPerPage,  // Number of items per page
//         });

//         if (searchQuery) {
//           searchParams.append('q', searchQuery);  // Append search query
//         }

//         // Fetch data from the backend
//         const response = await fetch(
//           `${summaryApi.recipeURL.url}/search?${searchParams.toString()}`,
//           {
//             method: summaryApi.recipeURL.method,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         const data = await response.json();
//         console.log('Fetched data:', data);  // For debugging purposes

//         // Set the recipes and calculate total pages
//         setRecipes(data.recipes || []);
//         setTotalPages(Math.ceil(data.total / itemsPerPage));  // Calculate total number of pages
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setRecipes([]);
//       }
//     };

//     fetchRecipes();  // Fetch recipes when searchQuery or currentPage changes
//   }, [currentPage, searchQuery]);

//   // Handle going to the next page
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prevPage => prevPage + 1);  // Move to the next page
//     }
//   };

//   // Handle going to the previous page
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(prevPage => prevPage - 1);  // Move to the previous page
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex flex-wrap md:p-4 ">
//         {recipes.length > 0 ? (
//           recipes.map((recipe, index) => (
//             <RecipeCard key={index} info={recipe._source || recipe} />  // Render each recipe card
//           ))
//         ) : (
//           <p>No recipes found.</p>
//         )}
//       </div>

//       {/* Pagination buttons */}
//       <div className="mt-4">
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}  // Disable if on the first page
//           className="mr-2 p-2 border border-black hover:bg-red-400 rounded-lg"
//         >
//           Prev
//         </button>
//         <span className="mx-3 p-2 text-white bg-black rounded-md">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}  // Disable if on the last page
//           className="ml-2 p-2 border border-black hover:bg-green-400 rounded-lg"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecipeContainer;

 

//filtering 
// import React, { useEffect, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import summaryApi from '../common';
// import RecipeCard from './RecipeCard';

// const RecipeContainer = ({ filter }) => {
//   const [recipes, setRecipes] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);  // Total number of pages
//   const [currentPage, setCurrentPage] = useState(1);  // Current page
//   const itemsPerPage = 10;  // Number of items per page

//   const { searchQuery } = useOutletContext();  // Search query from context

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       try {
//         // Create search parameters
//         const searchParams = new URLSearchParams({
//           page: currentPage,  // Current page number
//           size: itemsPerPage,  // Number of items per page
//         });

//         // Add filter parameters if they exist
//         if (filter && Object.keys(filter).length > 0) {
//           Object.entries(filter).forEach(([key, value]) => {
//             if (value) {
//               searchParams.append(key, value);
//             }
//           });
//         }

//         // Add search query if it exists
//         if (searchQuery) {
//           searchParams.append('q', searchQuery);  // Append search query
//         }

//         // Fetch data from the backend with both search and filter params
//         const response = await fetch(
//           `${summaryApi.recipeURL.url}/filter?${searchParams.toString()}`,
//           {
//             method: summaryApi.recipeURL.method,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         const data = await response.json();
//         console.log('Fetched data:', data);  // For debugging purposes

//         // Set the recipes and calculate total pages
//         setRecipes(data.recipes || []);
//         setTotalPages(Math.ceil(data.total / itemsPerPage));  // Calculate total number of pages
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setRecipes([]);
//       }
//     };

//     fetchRecipes();  // Fetch recipes when searchQuery, currentPage, or filter changes
//   }, [currentPage, searchQuery, filter]);

//   // Handle going to the next page
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prevPage => prevPage + 1);  // Move to the next page
//     }
//   };

//   // Handle going to the previous page
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(prevPage => prevPage - 1);  // Move to the previous page
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <div className="flex flex-wrap md:p-4 ">
//         {recipes.length > 0 ? (
//           recipes.map((recipe, index) => (
//             <RecipeCard key={index} info={recipe._source || recipe} />  // Render each recipe card
//           ))
//         ) : (
//           <p>No recipes found.</p>
//         )}
//       </div>

//       {/* Pagination buttons */}
//       <div className="mt-4">
//         <button
//           onClick={handlePreviousPage}
//           disabled={currentPage === 1}  // Disable if on the first page
//           className="mr-2 p-2 border border-black hover:bg-red-400 rounded-lg"
//         >
//           Prev
//         </button>
//         <span className="mx-3 p-2 text-white bg-black rounded-md">
//           Page {currentPage} of {totalPages}
//         </span>
//         <button
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}  // Disable if on the last page
//           className="ml-2 p-2 border border-black hover:bg-green-400 rounded-lg"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RecipeContainer;


// import React, { useEffect, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import summaryApi from '../common';
// import RecipeCard from './RecipeCard';

// const RecipeContainer = ({ filter }) => {
//   const [recipes, setRecipes] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);  // Total number of pages
//   const [currentPage, setCurrentPage] = useState(1);  // Current page
//   const [loading, setLoading] = useState(false);  // Loading state
//   const [error, setError] = useState(null);  // Error state
//   const itemsPerPage = 10;  // Number of items per page

//   const { searchQuery } = useOutletContext();  // Search query from context

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const searchParams = new URLSearchParams({
//           page: currentPage,
//           size: itemsPerPage,
//         });
  
//         if (filter && Object.keys(filter).length > 0) {
//           Object.entries(filter).forEach(([key, value]) => {
//             if (value) searchParams.append(key, value);
//           });
//         }
  
//         if (searchQuery) {
//           searchParams.append('q', searchQuery);
//         }
  
//         const response = await fetch(
//           `${summaryApi.recipeURL.url}/filter?${searchParams.toString()}`,
//           {
//             method: summaryApi.recipeURL.method,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );
  
//         const data = await response.json();
//         console.log('Fetched data:', data); // For debugging purposes
  
//         if (!response.ok) {
//           throw new Error(data.message || 'Failed to fetch recipes');
//         }
  
//         // Extract recipes from the _source field
//         const extractedRecipes = data.map((item) => item._source);
//         setRecipes(extractedRecipes);
//         setTotalPages(Math.ceil(data.total / itemsPerPage));
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setError(error.message || 'An error occurred');
//         setRecipes([]);
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     fetchRecipes();
//   }, [currentPage, searchQuery, filter]);
  

//   // Handle going to the next page
//   const handleNextPage = () => {
//     if (currentPage < totalPages) {
//       setCurrentPage(prevPage => prevPage + 1);  // Move to the next page
//     }
//   };

//   // Handle going to the previous page
//   const handlePreviousPage = () => {
//     if (currentPage > 1) {
//       setCurrentPage(prevPage => prevPage - 1);  // Move to the previous page
//     }
//   };

//   return (
//     <div className="flex flex-col items-center">
//       {/* Loading spinner */}
//       {loading && <div>Loading recipes...</div>}

//       {/* Error message */}
//       {error && <div className="text-red-500">{error}</div>}

//       {/* Recipe cards */}
//       {!loading && !error && (
//         <div className="flex flex-wrap md:p-4 ">
//           {recipes.length > 0 ? (
//             recipes.map((recipe, index) => (
//               <RecipeCard key={index} info={recipe._source || recipe} />  // Render each recipe card
//             ))
//           ) : (
//             <p>No recipes found.</p>
//           )}
//         </div>
//       )}

//       {/* Pagination buttons */}
//       {recipes.length > 0 && (
//         <div className="mt-4">
//           <button
//             onClick={handlePreviousPage}
//             disabled={currentPage === 1}  // Disable if on the first page
//             className="mr-2 p-2 border border-black hover:bg-red-400 rounded-lg"
//           >
//             Prev
//           </button>
//           <span className="mx-3 p-2 text-white bg-black rounded-md">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             onClick={handleNextPage}
//             disabled={currentPage === totalPages}  // Disable if on the last page
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

// import React, { useEffect, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import summaryApi from '../common';
// import RecipeCard from './RecipeCard';

// const RecipeContainer = ({ filter }) => {
//   const [recipes, setRecipes] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const itemsPerPage = 10;

//   const { searchQuery } = useOutletContext();

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const searchParams = new URLSearchParams({
//           page: currentPage,
//           size: itemsPerPage,
//         });

//         if (filter && Object.keys(filter).length > 0) {
//           Object.entries(filter).forEach(([key, value]) => {
//             if (value) searchParams.append(key, value);
//           });
//         }

//         if (searchQuery) {
//           searchParams.append('q', searchQuery);
//         }

//         const response = await fetch(
//           // `${summaryApi.recipeURL.url}/search?${searchParams.toString()}`,
//           `${summaryApi.recipeURL.url}/filter?${searchParams.toString()}`,
//           {
//             method: summaryApi.recipeURL.method,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         const data = await response.json();
//         console.log('Fetched data:', data);

//         if (!response.ok) {
//           throw new Error(data.message || 'Failed to fetch recipes');
//         }

//         // Handle case where `data` might not have a `total` field
//         const totalItems = data.total || 0;
//         setRecipes(data.map(item => item._source));
//         setTotalPages(Math.ceil(totalItems / itemsPerPage));
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setError(error.message || 'An error occurred');
//         setRecipes([]);
//       } finally {
//         setLoading(false);
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
//       {loading && <div>Loading recipes...</div>}
//       {error && <div className="text-red-500">{error}</div>}
//       {!loading && !error && (
//         <div className="flex flex-wrap md:p-4 ">
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









// import React, { useEffect, useState } from 'react';
// import { useOutletContext } from 'react-router-dom';
// import summaryApi from '../common';
// import RecipeCard from './RecipeCard';

// const RecipeContainer = ({ filter }) => {
//   const [recipes, setRecipes] = useState([]);
//   const [totalPages, setTotalPages] = useState(1);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const itemsPerPage = 10;
//   const { searchQuery } = useOutletContext();

//   useEffect(() => {
//     const fetchRecipes = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const searchParams = new URLSearchParams({
//           page: currentPage,
//           size: itemsPerPage,
//         });

//         // Add search query and filter parameters to searchParams
//         if (searchQuery) {
//           searchParams.append('q', searchQuery);
//         }

//         if (filter && Object.keys(filter).length > 0) {
//           Object.entries(filter).forEach(([key, value]) => {
//             if (value) searchParams.append(key, value);
//           });
//         }

//         // Determine which endpoint to use based on the presence of filter parameters
//         const endpoint = Object.keys(filter).length > 0 ? '/filter' : '/search';
//         const response = await fetch(
//           `${summaryApi.recipeURL.url}${endpoint}?${searchParams.toString()}`,
//           {
//             method: summaryApi.recipeURL.method,
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );

//         const data = await response.json();
//         console.log('Fetched data:', data);

//         if (!response.ok) {
//           throw new Error(data.message || 'Failed to fetch recipes');
//         }

//         // Handle case where `data` might not have a `total` field
//         const totalItems = endpoint === '/search' ? data.total : data.length;
//         setRecipes(endpoint === '/search' ? data.recipes : data);
//         setTotalPages(Math.ceil(totalItems / itemsPerPage));
//       } catch (error) {
//         console.error('Error fetching recipes:', error);
//         setError(error.message || 'An error occurred');
//         setRecipes([]);
//       } finally {
//         setLoading(false);
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
//       {loading && <div>Loading recipes...</div>}
//       {error && <div className="text-red-500">{error}</div>}
//       {!loading && !error && (
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

const RecipeContainer = ({ filter }) => {
  const [recipes, setRecipes] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;
  const { searchQuery } = useOutletContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      // setLoading(true);
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
            if (value) searchParams.append(key, value);
          });
        }

        const endpoint = Object.keys(filter).length > 0 ? '/filter' : '/search';
        const url = `${summaryApi.recipeURL.url}${endpoint}?${searchParams.toString()}`;

        console.log('Fetching from URL:', url); // Debug log

        const response = await fetch(url, {
          method: summaryApi.recipeURL.method,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        console.log('Fetched data:', data); // Debug log

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch recipes');
        }

        // Adjust according to your API response structure
        const totalItems = data.total || data.length || 0;
        setRecipes(data.recipes || data);
        setTotalPages(Math.ceil(totalItems / itemsPerPage));
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setError(error.message || 'An error occurred');
        setRecipes([]);
      } finally {
        // setLoading(false);
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

  return (
    <div className="flex flex-col items-center">
      {/* {loading && <div>Loading recipes...</div>} */}
      {error && <div className="text-red-500">{error}</div>}
      {  !error && (
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

