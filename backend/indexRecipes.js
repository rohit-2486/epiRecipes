// backend/indexRecipes.js
const fs = require('fs');
const path = require('path');
const client = require('./utils/openSearchClient');

// Update the path to the dataset
const datasetPath = path.join(__dirname, 'full_format_recipes.json');

async function indexRecipes() {
  try {
    const data = fs.readFileSync(datasetPath, 'utf-8');
    const recipes = JSON.parse(data);

    for (const recipe of recipes) {
      await client.index({
        index: 'epirecipes',
        body: recipe,
      });
      console.log(`Indexed recipe: ${recipe.title}`);
    }

    console.log('Indexing completed!');
  } catch (error) {
    console.error('Error indexing recipes:', error);
  }
}

indexRecipes();
