import React, { useState } from "react";
import "./BookResults.css";

export default function BookResults({ books, user }) {
  const [showFullDescription, setShowFullDescription] = useState({});


  const toggleDescription = (id) => {
    setShowFullDescription((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  function handleSaveBook(e) {
    // Select the right book to save
    const book = e.target.parentElement;
    const title = book.querySelector("h2").innerText;
    const authors = book.querySelector("h3").innerText;
    const description = book.querySelector("p").innerText;
    const userID = user._id;

    // Send a POST request to the server
    fetch("http://localhost:3000/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, authors, description, userID }),
    })
      .then((res) => res.text())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  }

  return (
    <div className="book-outer-container">
      {Array.isArray(books) &&
        books.map((book) => {
          const description = book.volumeInfo.description || "";
          const shortDescription = `${description.substring(0, 100)}...`;
          const thumbnail = book.volumeInfo.imageLinks?.thumbnail || "";
          return (
            <div key={book.id} className="book-container">
              <button onClick={handleSaveBook}>quick add</button>
              <h2>{book.volumeInfo.title}</h2>
              <h3>{book.volumeInfo.authors}</h3>
              <img src={thumbnail} alt={book.volumeInfo.title} />
              <p>
                {showFullDescription[book.id] ? description : shortDescription}
              </p>
              <button onClick={() => toggleDescription(book.id)}>
                {showFullDescription[book.id] ? "Show Less" : "Show More"}
              </button>
              <button>Learn More</button>
            </div>
          );
        })}
    </div>
  );
}
