const { OpenAI } = require("openai");
const axios = require("axios");

// const openai = new OpenAI(process.env.OPENAI_API_KEY);
const OPENAI_API_KEY = 'sk-proj-lEIm1wpEf4dchA6quuyqT3BlbkFJcjfwLxqX6TZRQLXqa17d';
const openai = new OpenAI(OPENAI_API_KEY);

exports.ask = async (req, res) => {
    const { prompt, books } = req.body;
    console.log(books);

const formattedBooks = [];
// books is an array of objects we need to iterate over and extract data from to send to our ai

books.forEach(book => {
    // console.log(book.book.volumeInfo.title);
    // console.log(book.book.volumeInfo.authors);
    // console.log(book.book.volumeInfo.description);

    formattedBooks.push({
        title: book.book.volumeInfo.title,
        authors: book.book.volumeInfo.authors,
        description: book.book.volumeInfo.description
    });
});

console.log(formattedBooks);


    try {
        const response = await axios.post(
          'https://api.openai.com/v1/chat/completions',
          {
            model: 'gpt-3.5-turbo',
            messages: [
// send the prompt and books to the AI so that it can view the array of books but also read the prompt
            //   { role: 'system', content: 'You are a helpful assistant' },
            //   { role: 'user', content: prompt }
            { role: 'system', content: 'You are a helpful assistant designed to make book recommendations based off a list we provide you from our user database. When provided with a list you are to strike a conversation with the user about the books they like and help them determine other ones to read' },
            { role: 'user', content: `Here are the books to make recommendations on. You are to make recommendations for other books based off of these ones ${formattedBooks}` },
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
