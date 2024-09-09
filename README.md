# EpiRecipes Search Platform

[Watch the video](https://www.youtube.com/watch?v=tCrf55SHnZY)


## Table of Contents
1. [Project Setup](#project-setup)
2. [Technologies Used](#technologies-used)
3. [Features](#features)
4. [API Endpoints](#api-endpoints)
5. [Frontend](#frontend)
6. [OpenSearch Setup](#opensearch-setup)
7. [Contributing](#contributing)
8. [License](#license)

## Project Setup

### Prerequisites:
- Node.js installed on your machine
- OpenSearch installed and running locally
- Git installed
- React.js development environment

### Steps to Run Locally:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/rohit-2486/epiRecipes.git

2. **Navigate to the project directory**:
   ```bash
   cd epiRecipes

3. **Backend Setup**:
  -  Navigate to the backend folder
     ```bash
     cd backend
  - Install dependencies:
     ```bash
     npm install
  - Add environment variables in a .env file:
    ```bash
    OPENSEARCH_NODE=http://localhost:9200
  - Start the backend server:
    ```bash
    npm start
  
  4. **Frontend Setup**:
  -  Navigate to the frontend folder
     ```bash
     cd frontend
  - Install dependencies:
     ```bash
     npm install
  - Start the backend server:
    ```bash
    npm run dev

### Technologies Used
 - Backend: Node.js, Express
- Frontend: React.js, Tailwind CSS
- Database: OpenSearch for recipe search and filtering
- Version Control: Git and GitHub

### Features:

1. **Search Recipes**:
  Users can search for recipes using keywords related to the   recipe's title and category.

2. **Filter Recipes**:
 - Rating: High-rated recipes
 - Diet: Vegetarian or non-vegetarian recipes 
 -  Nutritional Content: High protein or low-fat recipes

 3. **Pagination**:
   The results are paginated for easy navigation through a large number of recipes.
 
 4. **Responsive ui**:
 The interface is responsive and inspired by e-commerce platforms like Flipkart or Amazon.

 ### Api Endpoints:
 The backend provides several API endpoints to interact with the recipe data stored in OpenSearch.

 1. **Search recipes** 
 - GET /search?q=<search_query>&page=<page_number>&limit=<limit>
 - Description: Retrieves recipes based on the search query and supports pagination.

 2. **Filter recipes** 
 - GET /filter?minProtein=<min_value>&maxFat=<max_value>&rating=<rating>&veg=<true_or_false>
 - Description: Filters recipes based on criteria such as minimum protein, maximum fat, rating, and whether it’s vegetarian

3. **Get Recipe by ID** 
 - GET /recipe/:id
 - Description: Retrieves the recipe with the specified ID.

### OpenSearch Setup:
Install OpenSearch locally without security

- Navigate to OpenSearch folder 
   ```bash
      cd opensearch

- Navigate to bin folder 
   ```bash
      cd bin

- Start OpenSearch
   ```bash
      .\opensearch.bat


### Contributing
If you want to contribute to this project, please follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top right of this repository's GitHub page to create a copy of the repository under your own GitHub account.

2. **Clone your fork**: Clone your forked repository to your local machine:
   ```bash
   git clone https://github.com/rohit-2486/epiRecipes

3. **Navigate to the project directory:**
   ```bash
   cd epiRecipes

4. **Create a new branch:**
   ```bash
   git checkout -b feature-branch

   Replace feature-branch with a descriptive name for your branch.

5. **Make your changes:**  Edit, add, or delete files as necessary.

6. **Commit your changes**
    ```bash
        git commit -m "Add new feature"

7. **Push to your branch:**
    ```bash 
    git push origin feature-branch

### Additional Notes:
- **Forking the Repository**: Ensure contributors understand that forking creates their own copy of the repository on GitHub, which they can modify without affecting the original project.
- **Cloning the Fork**: Provides instructions on how to clone their forked copy of the repository.
- **Branch Naming**: Encourage descriptive branch names to make it clear what feature or fix is being worked on.
- **Pull Request**: Mention that a pull request should be created with a clear description of what was changed and why.

Feel free to copy and paste this updated version into your `README.md` file.
