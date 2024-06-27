import React, { useState } from "react";
import LearnMore from "./LearnMore";


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
    <div className="grid grid-cols-4 p-5 gap-2">
      {Array.isArray(books) &&
        books.map((book) => {
          const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "";
          return (
            // Book Container
            <div key={book.id} className="bg-slate-700 hover:bg-slate-900">
              <div className="text-center text-lg">
              <h2 className="text-slate-200">{book.volumeInfo.title}</h2>
              <h3 className="text-slate-300">{book.volumeInfo.authors}</h3>
              </div>
              <div className="flex justify-center">
              <img className="main-book-img" src={thumbnail} alt={book.volumeInfo.title} />
              </div>
              {/* Main Book Buttons */}
              <div className="flex justify-around p-3">
              <button className="btn btn-primary" onClick={() => handleLearnMore(book.id)}>
                Learn More
              </button>
              {selectedBook === book.id && learnMore ? (
                <LearnMore book={book.volumeInfo} setLearnMore={setLearnMore} />
              ) : null}
              <button className="btn btn-primary" onClick={() => handleSaveBook(book)}>quick add</button>
            </div>
            </div>
          );
        })}
    </div>
  );
}
