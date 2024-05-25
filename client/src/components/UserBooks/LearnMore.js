import React from "react";
import "./LearnMore.css";

export default function LearnMore({ book, setLearnMore }) {
  function handleClose() {
    setLearnMore(false);
  }

  return (
    // In Depth Book Info Screen info from volumeInfo from google books is available at book
    <div className="learnmore-container">
      <div className="book-main-info">
        <div className="book-title">
          <h2>{book.title}</h2>
          <h3>{book.authors}</h3>
        </div>
        <p className="pop-disc">{book.description}</p>
        <a href={book.infoLink} target="_blank" rel="noreferrer">
          More Info
        </a>
      </div>

      <div className="book-secondary-info">
        <h4>Categories</h4>
        {book.categories !== undefined ? (
          <ul>
            {book.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        ) : null}
        <h4>Page Count</h4>
        <p>{book.pageCount}</p>
      </div>

      <button className="close-btn-pop" onClick={handleClose}>X</button>
    </div>
  );
}
