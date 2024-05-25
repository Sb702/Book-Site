import React, { useEffect, useState } from "react";
import './UserBookRender.css'

export default function UserBookRender({ user }) {
  const [userBooks, setUserBooks] = useState([]);
  console.log(userBooks)

//   console.log(user._id);
  useEffect(() => {
    fetch(`http://localhost:3000/books/${user._id}`)
      .then((res) => res.json())
      .then((data) => setUserBooks(data));
  }, []);

  return <div>
    <h1>Your Books:</h1>

  <div className="book-outer-wrap">
    {userBooks.map((book) => {
      return <div key={book._id} className="book-wrap">
        <h3>{book.book.volumeInfo.title}</h3>
        <img src={book.book.volumeInfo.imageLinks.thumbnail} alt={book.book.volumeInfo.title} />
        <p>{book.book.volumeInfo.authors}</p>
      </div>;
    })}
    </div>
  </div>;
}
