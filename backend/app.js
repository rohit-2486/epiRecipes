
require('dotenv').config(); 
const express = require('express');
const cors = require('cors') 
const recipesRouter = require('./routes/recipes');

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;


app.use(express.json());

app.use('/api/recipes', recipesRouter);


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
