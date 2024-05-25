import React, { useState } from "react";
import LearnMore from "./LearnMore";
import "./BookResults.css";

export default function BookResults({ books, user, setAddBook, addBook}) {
  const [learnMore, setLearnMore] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Handle learn more press
  function handleLearnMore(book) {
    setSelectedBook(book);
    setLearnMore(!learnMore);
  }
  // Send a POST request to the server
  function handleSaveBook(book) {
    fetch("http://localhost:3000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(book, userID: user._id),
      body: JSON.stringify({ book, userID: user._id }),
    })
      .then((res) => res.text())
      .then((data) => console.log(data))
      .catch((err) => console.error(err), setAddBook(!addBook), console.log('addBook:', addBook) );
  }

  return (
    <div className="book-outer-container">
      {Array.isArray(books) &&
        books.map((book) => {
          const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "";
          return (
            // Book Container
            <div key={book.id} className="book-container">
              <div className="title-container-book">
              <h2>{book.volumeInfo.title}</h2>
              <h3>{book.volumeInfo.authors}</h3>
              </div>
              <img className="main-book-img" src={thumbnail} alt={book.volumeInfo.title} />
              {/* Main Book Buttons */}
              <div className="main-book-btns">
              <button className="book-btn" onClick={() => handleLearnMore(book.id)}>
                Learn More
              </button>
              {selectedBook === book.id && learnMore ? (
                <LearnMore book={book.volumeInfo} setLearnMore={setLearnMore} />
              ) : null}
              <button className="book-btn" onClick={() => handleSaveBook(book)}>quick add</button>
            </div>
            </div>
          );
        })}
    </div>
  );
}
