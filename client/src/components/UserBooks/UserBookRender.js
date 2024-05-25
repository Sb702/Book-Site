import React, { useEffect, useState } from "react";

export default function UserBookRender({ user }) {
  const [userBooks, setUserBooks] = useState([]);

  console.log(user._id);
  useEffect(() => {
    fetch(`http://localhost:3000/books/${user._id}`)
      .then((res) => res.json())
      .then((data) => setUserBooks(data));
  }, []);

  return <div>
    <h1>Your Books:</h1>
    {userBooks.map((book) => {
      return <div key={book._id}>
        <h3>{book.title}</h3>
        <p>{book.authors}</p>
        <p>{book.description}</p>
      </div>;
    })}
  </div>;
}
