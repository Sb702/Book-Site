import React, { useState } from 'react'
import BookSearch from './BookSearch'
import BookResults from './BookResults'
import './BookContainer.css'

export default function BookContainer({ user }) {
  const [books, setBooks] = useState([])

  return (
    <div className='container'>
      <div className='booksearch'>
      <BookSearch setBooks={setBooks}/>
      <BookResults books={books} user={user} />
      </div>
      <div className='favorites'>
        <h3>Favorites</h3>
      </div>
    </div>
  )
}
