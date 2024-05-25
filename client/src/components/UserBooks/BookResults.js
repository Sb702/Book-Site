import React from 'react'

export default function BookResults({ books }) {
  return (
    <div>
        {books.map(book => {
            return (
            <div key={book.id}>
                <h2>{book.volumeInfo.title}</h2>
                <h3>{book.volumeInfo.authors}</h3>
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                <p>{book.volumeInfo.description}</p>
            </div>
            )
        })}
    </div>
  )
}
