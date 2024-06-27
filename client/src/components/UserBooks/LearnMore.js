import React from "react";
import "./LearnMore.css";

export default function LearnMore({ book, setLearnMore }) {
  function handleClose() {
    setLearnMore(false);
  }

  return (
    // In Depth Book Info Screen info from volumeInfo from google books is available at book
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-slate-800 p-10">
      <div className="book-main-info">
        <div className="text-2xl flex gap-2">
          <h2 className="text-slate-200">{book.title}</h2>
          <h3 className="text-slate-400">{book.authors}</h3>
        </div>
        <p className="pt-2">{book.description}</p>
        {/* <a href={book.infoLink} target="_blank" rel="noreferrer">
          More Info
        </a> */}
        <div className="flex justify-center p-3">
        <button className="btn btn-primary" onClick={() => window.open(book.infoLink)}>More Info</button>
        </div>
      </div>

      <div className="flex gap-10 justify-center">
        <div>

        <h4 className="text-xl text-slate-200 text-center">Categories</h4>
        {book.categories !== undefined ? (
          <ul>
            {book.categories.map((category, index) => (
              <li key={index}>{category}</li>
            ))}
          </ul>
        ) : null}
        </div>
        <div>
        <h4 className="text-xl text-slate-200 text-center">Page Count</h4>
        <p className="text-center">{book.pageCount}</p>
        </div>
      </div>

      <button className="absolute top-5 right-5 bg-slate-300 rounded-md p-1 px-2"  onClick={handleClose}>X</button>
    </div>
  );
}
