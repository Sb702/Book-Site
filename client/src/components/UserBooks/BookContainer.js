import React, { useState } from 'react'
import BookSearch from './BookSearch'
import BookResults from './BookResults'

export default function BookContainer() {
  const [books, setBooks] = useState([])

  return (
    <div>
      <BookSearch setBooks={setBooks}/>
      <BookResults books={books} />
    </div>
  )
}
