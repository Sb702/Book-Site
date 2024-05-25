require("dotenv").config();
const axios = require("axios");
const BookModel = require("../models/BookModel");

exports.search = async (req, res) => {
  const { searchQuery } = req.body;

  const books = await axios.get("https://www.googleapis.com/books/v1/volumes", {
    params: {
      q: searchQuery,
      key: process.env.GOOGLE_BOOKS_API_KEY,
    },
  });

  res.status(200).send(books.data);
};

exports.save = async (req, res) => {
  const { title, authors, description, userID } = req.body;
  const book = new BookModel({ title, authors, description, userID });
  await book.save();
  res.status(201).send("Book saved!");
};