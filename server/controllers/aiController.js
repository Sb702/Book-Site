const { OpenAI } = require("openai");
const axios = require("axios");

// const openai = new OpenAI(process.env.OPENAI_API_KEY);
const OPENAI_API_KEY = 'sk-proj-lEIm1wpEf4dchA6quuyqT3BlbkFJcjfwLxqX6TZRQLXqa17d';
const openai = new OpenAI(OPENAI_API_KEY);

exports.ask = async (req, res) => {
    const { prompt, books } = req.body;
    console.log(books);

    const formattedBooks = books.map(book => {
        return `Title: ${book.book.volumeInfo.title}, Authors: ${book.book.volumeInfo.authors.join(', ')}, Description: ${book.book.volumeInfo.description}`;
    }).join('\n\n');

console.log(formattedBooks);


    try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant designed to make book recommendations based on a list provided by the user. When provided with a list, you should engage in a conversation with the user about the books they like and help them determine other ones to read.' },
                { role: 'user', content: `Here are the books to make recommendations on:\n\n${formattedBooks}` },
                { role: 'user', content: prompt },
            ],
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${OPENAI_API_KEY}`,
            },
          }
        );
    
        const chatResponse = response.data.choices[0].message.content;
        res.json({ response: chatResponse });
      } catch (error) {
        console.error('Error communicating with OpenAI:', error.message);
        res.status(500).json({ error: 'Failed to communicate with OpenAI' });
      }
    };
