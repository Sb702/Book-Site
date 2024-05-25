import React, { useEffect, useState } from "react";
import "./UserBookRender.css";

export default function UserBookRender({ user }) {
  const [userBooks, setUserBooks] = useState([]);
  const [update, setUpdate] = useState(false);
  console.log(userBooks);

  //   console.log(user._id);
  useEffect(() => {
    fetch(`http://localhost:3000/books/${user._id}`)
      .then((res) => res.json())
      .then((data) => setUserBooks(data));
  }, [update]);

function handleDelete(id) {
  fetch(`http://localhost:3000/delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      // Check if there's content to parse
      if (res.status !== 204) {
        return res.json();
      }
    })
    .then((data) => {
      if (data) { 
        console.log(data);
        setUpdate(!update);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

  return ( 
    <div>
      <h1>Your Books:</h1>

      <div className="book-outer-wrap">
        {userBooks.map((book) => {
          return (
            <div key={book._id} className="book-wrap">
              <h3>{book.book.volumeInfo.title}</h3>
              <img
                src={book.book.volumeInfo.imageLinks.thumbnail}
                alt={book.book.volumeInfo.title}
              />
              <p>{book.book.volumeInfo.authors}</p>
              <button onClick={() => handleDelete(book._id)}>delete</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
