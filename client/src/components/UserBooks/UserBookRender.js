import React, { useEffect, useState } from "react";

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
  {/* userbooks is an array of objects where inside the book is at userbooks[i].book.volumeInfo */}
    {userBooks.map((book) => {
      return <div key={book._id}>
        <h3>{book.book.volumeInfo.title}</h3>
        <img src={book.book.volumeInfo.imageLinks.thumbnail} alt={book.book.volumeInfo.title} />
        <p>{book.book.volumeInfo.authors}</p>
        <p>{book.book.volumeInfo.description}</p>
      </div>;
    })}
  </div>;
}
