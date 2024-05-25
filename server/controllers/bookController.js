require('dotenv').config();
const axios = require('axios');

exports.search = async (req, res) => {
    const { searchQuery } = req.body;
    
    const books = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
            q: searchQuery,
            key: process.env.GOOGLE_BOOKS_API_KEY,
        }
        
    });
    
    res.status(200).send(books.data);
    }
