const { OpenAI } = require("openai");
const axios = require("axios");

// const openai = new OpenAI(process.env.OPENAI_API_KEY);
const OPENAI_API_KEY =
  "sk-proj-lEIm1wpEf4dchA6quuyqT3BlbkFJcjfwLxqX6TZRQLXqa17d";
const openai = new OpenAI(OPENAI_API_KEY);

const instructions = `You are a helpful assistant for recommending books. You will respond with one response but inside of that response you will have two separate sections. The first section is going to be your response to the overall conversation. The next response will be the books that you recommend to the user when you feel the need to recommend them. This is extremely important. You will only recommend books in the format of APITitle: Booktitle, APIAuthors: Authors, APIDescription: Description. This way we can format the data you send back to us properly with regex. For example:
                
APITitle: The Great Gatsby, APIAuthors: F. Scott Fitzgerald, APIDescription: The Great Gatsby, F. Scott Fitzgerald's third book, stands as the supreme achievement of his career. This exemplary novel of the Jazz Age has been acclaimed by generations of readers. The story is of the fabulously wealthy Jay Gatsby and his new love for the beautiful Daisy Buchanan, of lavish parties on Long Island at a time when The New York Times noted "gin was the national drink

You will only respond with this format from now one whenever you respond with books. This is extremely important. If you do not respond with this format, we will not be able to parse the data properly. 

Do not number the books. Just list them in the format above. If you have any questions, please let us know.
`;

exports.ask = async (req, res) => {
  const { prompt, books } = req.body;
  console.log(books);

  const formattedBooks = books
    .map((book) => {
      const title = book.book.volumeInfo.title;
      const authors = Array.isArray(book.book.volumeInfo.authors)
        ? book.book.volumeInfo.authors.join(", ")
        : "N/A";
      const description = book.book.volumeInfo.description;
      return `Title: ${title}, Authors: ${authors}, Description: ${description}`;
    })
    .join("\n\n");

  // console.log(formattedBooks);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `${instructions}`,
          },
          // { role: 'system', content: 'You are a helpful assistant designed to make book recommendations based on a list provided by the user. When provided with a list, you should engage in a conversation with the user about the books they like and help them determine other ones to read.' },
          {
            role: "user",
            content: `Here are the books to make recommendations on:\n\n${formattedBooks}`,
          },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const chatResponse = response.data.choices[0].message.content;
    res.json({ response: chatResponse });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error.message);
    res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
};

exports.askMany = async (req, res) => {
  const { prompt, books, messages } = req.body;

  const formattedBooks = books
    .map((book) => {
      const title = book.book.volumeInfo.title;
      const authors = Array.isArray(book.book.volumeInfo.authors)
        ? book.book.volumeInfo.authors.join(", ")
        : "N/A";
      const description = book.book.volumeInfo.description;
      return `Title: ${title}, Authors: ${authors}, Description: ${description}`;
    })
    .join("\n\n");

  // format the messages so that they are in the correct format for the OpenAI API to understand currently we have an array of objects with a type and content property. We need to convert this into plane text with the user and ai messages separated by a newline character
  const formattedMessages = messages
    .map((message) => {
      return `${message.type === "user" ? "User" : "AI"}: ${message.content}`;
    })
    .join("\n");

  console.log(messages);

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant designed to make book recommendations based on a list provided by the user. When provided with a list, you should engage in a conversation with the user about the books they like and help them determine other ones to read. Here are any previous messages from our past conversion ${formattedMessages}
            ${instructions}
                    `,
          },
          {
            role: "user",
            content: `Here are the books to make recommendations on:\n\n${formattedBooks}`,
          },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
      }
    );

    const chatResponse = response.data.choices[0].message.content;
    res.json({ response: chatResponse });
  } catch (error) {
    console.error("Error communicating with OpenAI:", error.message);
    res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
};
