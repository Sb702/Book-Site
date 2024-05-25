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
  const { book, userID } = req.body;
  const bookm = new BookModel({ userID: userID, book: book });
  await bookm.save();
  res.status(201).send("Book saved!");
};