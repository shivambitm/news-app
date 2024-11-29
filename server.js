const express = require('express');
const path = require('path');
const axios = require('axios');
require('dotenv').config(); // To load environment variables from a .env file

const app = express();
const port = 8080;

// Use environment variables for sensitive data like API keys
const NEWS_API_KEY = process.env.NEWS_API_KEY;

// Serve the homepage
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname) });
});

// API endpoint to proxy requests to NewsAPI
app.get('/api', async (req, res) => {
  try {
    // Parse the incoming query string and append the API key
    const query = req._parsedUrl.query;
    const url = `https://newsapi.org/v2/everything?${query}&apiKey=${NEWS_API_KEY}`;

    // Make the API request
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    // Handle errors from the NewsAPI or other unexpected issues
    if (error.response) {
      console.error('Error response from NewsAPI:', error.response.data);
      res.status(error.response.status).json({
        error: error.response.data.message || 'An error occurred with the NewsAPI request',
      });
    } else {
      console.error('Error during API request:', error.message);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(`News-API App is listening on port ${port}`);
});
