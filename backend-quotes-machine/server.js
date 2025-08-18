require('dotenv').config();
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 3001; 

app.use(cors()); 

app.get('/api/quote', async (req, res) => {
    const apiKey = process.env.API_KEY; 
    const apiUrl = 'https://api.api-ninjas.com/v1/quotes';
    try {
        const response = await fetch(apiUrl,{
            headers: {
                'X-Api-Key': apiKey
            }
        }); 
        if (!response.ok){
            throw new Error(`API returned an error:${response.status} ${response.statusText}`);
        }
        const data = await response.json(); 
        res.json(data); 
    } catch (error){
        console.error("Error fetching quote:", error); 
        res.status(500).json({error: 'Failed to fetch quote'});
    }
    }
);

app.listen(PORT, () => {
    console.log(`Backend server is listening at http://localhost:${PORT}`);
});