import React, { useState } from 'react'
import BookSearch from './BookSearch'
import BookResults from './BookResults'
import './BookContainer.css'
import FavoritesRender from './FavoritesRender'

export default function BookContainer({ user }) {
  const [books, setBooks] = useState([])
  const [addBook, setAddBook] = useState(false)

  return (
    <div className='container'>
      <div className='booksearch'>
      <BookSearch setBooks={setBooks}/>
      <BookResults books={books} user={user} setAddBook={setAddBook} addBook={addBook}/>
      </div>
      <div className='favorites'>
        <FavoritesRender user={user} addBook={addBook} />
      </div>
    </div>
  )
}
