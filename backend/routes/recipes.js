
const express = require('express');
const router = express.Router();
const client = require('../utils/openSearchClient');


// Route to retrieve all recipes
router.get('/', async (req, res) => {
  const { from = 0, size = 20 } = req.query;  

  try {
    const { body } = await client.search({
      index: 'epirecipes',
      body: {
        query: {
          match_all: {}  
        },
        from: parseInt(from, 10), 
        size: parseInt(size, 20)   
      }
    });
 
    res.json({
      recipes: body.hits.hits,
      total: body.hits.total.value
    });
  } catch (error) {
    console.error('Error retrieving all recipes:', error);
    res.status(500).send('Error retrieving all recipes');
  }
});


// Route to search recipes
// router.get('/search', async (req, res) => {
//   const { q, page = 1, size = 10 } = req.query;
//   const from = (page - 1) * size;

//   try {
//     const { body } = await client.search({
//       index: 'epirecipes',
//       body: {
//         query: {
//           bool: {
//             should: [
//               q ? { match: { title: q } } : null,  
//               q ? { match: { categories: q } } : null   
//             ].filter(Boolean)
//           }
//         },
//         from,  
//         size  
//       }
//     });

    
//     res.json({
//       recipes: body.hits.hits,
//       total: body.hits.total.value  
//     });
//   } catch (error) {
//     console.error('Error searching recipes:', error);
//     res.status(500).send('Error searching recipes');
//   }
// });

router.get('/search', async (req, res) => {
  const { q, page = 1, size = 10, rating, veg, categories } = req.query;
  const from = (page - 1) * size;

  // Parse and handle query parameters
  const minRating = rating ? parseFloat(rating) : null;
  const isVeg = veg === 'true';
  const categoryList = categories ? (Array.isArray(categories) ? categories : categories.split(',')) : [];

  try {
    const { body } = await client.search({
      index: 'epirecipes',
      body: {
        query: {
          bool: {
            must: [
              // Search query
              q ? { multi_match: { query: q, fields: ['title^3', 'categories'] } } : { match_all: {} },
              
              // Filter conditions
              minRating !== null ? { range: { rating: { gte: minRating } } } : null,
              isVeg ? { match: { ingredients: 'vegetarian' } } : null,
              categoryList.length > 0 ? { terms: { "categories.keyword": categoryList } } : null
            ].filter(Boolean) // Remove null values
          }
        },
        from,
        size
      }
    });

    res.json({
      recipes: body.hits.hits,
      total: body.hits.total?.value ?? body.hits.total
    });
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).send('Error searching recipes');
  }
});



// Route to filter recipes
// router.get('/filter', async (req, res) => {
//   const { page = 1, size = 10 } = req.query;
//   const from = (page - 1) * size;

//   const { rating, veg } = req.query;
 
//   // Parse query parameters  
//   const minRating = rating ? parseFloat(rating) : null;

//   try {
//     const { body } = await client.search({
//       index: 'epirecipes',
//       body: {
//         query: {
//           bool: {
//             must: [
//               minRating !== null ? { range: { rating: { gte: minRating } } } : null,
//               veg === 'true' ? { match: { categories: 'vegetarian' } } : null
//             ].filter(Boolean) // Remove null values
//           }
//         },
//         from, 
//         size 
//       }
//     });
 
//     const total = body.hits.total?.value ?? body.hits.total;

//     res.json({
//       recipes: body.hits.hits,
//       total 
//     });
//   } catch (error) {
//     console.error('Error filtering recipes:', error);
//     res.status(500).send('Error filtering recipes');
//   }
// });




 
router.get('/filter', async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const from = (page - 1) * size;

  let { rating, veg, categories } = req.query;

  // Parse and handle query parameters
  const minRating = rating ? parseFloat(rating) : null;
  const isVeg = veg === 'true';
  const categoryList = categories ? (Array.isArray(categories) ? categories : categories.split(',')) : [];

  // Logging the received query parameters
  console.log('Received query parameters:', {
    page,
    size,
    rating,
    veg,
    categories
  });

  try {
    const { body } = await client.search({
      index: 'epirecipes',
      body: {
        query: {
          bool: {
            must: [
              minRating !== null ? { range: { rating: { gte: minRating } } } : null,
              isVeg ? { match: { ingredients: 'vegetarian' } } : null,
              categoryList.length > 0 ? { terms: { "categories.keyword": categoryList } } : null
            ].filter(Boolean)  
          }
        },
        from,
        size
      }
    });

    // Logging the search query and response
    console.log('Search query:', {
      index: 'epirecipes',
      body: {
        query: {
          bool: {
            must: [
              minRating !== null ? { range: { rating: { gte: minRating } } } : null,
              isVeg ? { match: { ingredients: 'vegetarian' } } : null,
              categoryList.length > 0 ? { terms: { "categories.keyword": categoryList } } : null
            ].filter(Boolean)
          }
        },
        from,
        size
      }
    });
    
    console.log('Search response:', {
      total: body.hits.total?.value ?? body.hits.total,
      recipes: body.hits.hits
    });

    const total = body.hits.total?.value ?? body.hits.total;

    res.json({
      recipes: body.hits.hits,
      total
    });
  } catch (error) {
    console.error('Error filtering recipes:', error);
    res.status(500).send('Error filtering recipes');
  }
});

 

module.exports = router;


