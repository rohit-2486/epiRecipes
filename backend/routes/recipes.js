
const express = require('express');
const router = express.Router();
const client = require('../utils/openSearchClient');

// Route to retrieve all recipes
router.get('/', async (req, res) => {
  const { from = 0, size = 20 } = req.query; // Pagination support

  try {
    const { body } = await client.search({
      index: 'epirecipes',
      body: {
        query: {
          match_all: {} // Match all documents
        },
        from: parseInt(from, 10), // Pagination - start from
        size: parseInt(size, 20)  // Pagination - number of results per page
      }
    });

    // res.json(body.hits.hits); // Return the hits (documents)
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
router.get('/search', async (req, res) => {
  const { q, page = 1, size = 10 } = req.query;
  const from = (page - 1) * size;

  try {
    const { body } = await client.search({
      index: 'epirecipes',
      body: {
        query: {
          bool: {
            should: [
              q ? { match: { title: q } } : null,  // Search for query in title
              q ? { match: { categories: q } } : null  // Search for query in categories
            ].filter(Boolean)
          }
        },
        from, // Pagination
        size  // Number of results per page
      }
    });

    // Send the results back, including total hits for pagination
    res.json({
      recipes: body.hits.hits,
      total: body.hits.total.value  // Total number of hits
    });
  } catch (error) {
    console.error('Error searching recipes:', error);
    res.status(500).send('Error searching recipes');
  }
});

// Route to filter recipes
router.get('/filter', async (req, res) => {
  const { page = 1, size = 10 } = req.query;
  const from = (page - 1) * size;

  const { rating, veg } = req.query;
 
  // Parse query parameters  
  const minRating = rating ? parseFloat(rating) : null;

  try {
    const { body } = await client.search({
      index: 'epirecipes',
      body: {
        query: {
          bool: {
            must: [
              minRating !== null ? { range: { rating: { gte: minRating } } } : null,
              veg === 'true' ? { match: { categories: 'vegetarian' } } : null
            ].filter(Boolean) // Remove null values
          }
        },
        from, // Pagination
        size  // Number of results per page
      }
    });

    // Log response to check format
    // console.log('Elasticsearch response:', body);

    // Ensure body.hits.total is correctly handled for pagination
    const total = body.hits.total?.value ?? body.hits.total;

    res.json({
      recipes: body.hits.hits,
      total // Total number of hits
    });
  } catch (error) {
    console.error('Error filtering recipes:', error);
    res.status(500).send('Error filtering recipes');
  }
});



module.exports = router;


