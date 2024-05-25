import React, { useState } from 'react'
import BookSearch from './BookSearch'
import BookResults from './BookResults'

export default function BookContainer({ user }) {
  const [books, setBooks] = useState([])

  return (
    <div>
      <BookSearch setBooks={setBooks}/>
      <BookResults books={books} user={user} />
    </div>
  )
}
