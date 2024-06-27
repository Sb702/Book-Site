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
      <h1 className="text-center text-xl text-slate-200">Your Favorite Books</h1>
      <div className="grid grid-cols-3 gap-3 justify-center items-end">
        {userBooks.map((book) => {
          return (
            <div key={book._id} className="flex-row text-center hover:-translate-y-2">
              <h3 className="justify-self-center" style={{ alignSelf: "center" }}>{book.book.volumeInfo.title}</h3>
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
