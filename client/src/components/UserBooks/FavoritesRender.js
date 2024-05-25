import React, { useState, useEffect } from "react";

export default function FavoritesRender({ user, addBook }) {
  const [userBooks, setUserBooks] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/books/${user._id}`)
      .then((res) => res.json())
      .then((data) => setUserBooks(data));
  }, [addBook]);

  return (
    <div>
      <h1>Your Favorite Books:</h1>
      <div className="book-outer-wrap">
        {userBooks.map((book) => {
          return (
            <div key={book._id} className="book-wrap">
              <h3>{book.book.volumeInfo.title}</h3>
              <img
                src={book.book.volumeInfo.imageLinks.thumbnail}
                alt={book.book.volumeInfo.title}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
