require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const serverless = require('serverless-http');

const app = express();
const router = express.Router();

app.use(cors());

// Simple test route
router.get('/', (req, res) => {
  res.send("✅ Server is running");
});

// Quote route
router.get('/quote', async (req, res) => {
  const apiKey = process.env.API_KEY;
  const apiUrl = 'https://api.api-ninjas.com/v1/quotes';

  try {
    const response = await fetch(apiUrl, {
      headers: { 'X-Api-Key': apiKey }
    });

    if (!response.ok) {
      throw new Error(`API returned an error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching quote:", error);
    res.status(500).json({ error: 'Failed to fetch quote' });
  }
});

// Mount router under /.netlify/functions/server
app.use('/', router);

// Local dev server (optional)
if (process.env.NODE_ENV !== 'production') {
  const PORT = 3001;
  app.listen(PORT, () => {
    console.log(`🚀 Backend running at http://localhost:${PORT}`);
  });
}

module.exports.handler = serverless(app);
