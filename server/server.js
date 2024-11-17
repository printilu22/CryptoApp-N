import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch'; // Using import instead of require
import dotenv from 'dotenv'; // Import dotenv to load environment variables

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000; // Use the port provided by Render

// Use CORS middleware
app.use(cors());

// Route to fetch crypto news
app.get('/api/everything', async (req, res) => {
    const { q, pageSize } = req.query; // Get query parameters
    const apiUrl = `https://newsapi.org/v2/everything?q=${q}&pageSize=${pageSize}&apiKey=${process.env.NEWS_API_KEY}`; // Changed REACT_APP_NEWS_API_KEY to NEWS_API_KEY
    
    try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) { // Check if the response is okay
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data); // Send the response back to the React app
    } catch (error) {
        console.error('Error fetching data from News API:', error);
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
