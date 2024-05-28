import React from 'react'
import './BookSearch.css'

export default function BookSearch({ setBooks }) {
    const handleSearch = async (e) => {
        e.preventDefault()
        console.log("searching for book")
        const search = await fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ searchQuery: e.target[0].value })
        })
        const searchResults = await search.json()
        setBooks(searchResults.items)
        console.log(searchResults)
    }

  return (
    <div>
        <form onSubmit={handleSearch} className='book-search-wrap'> 
            <input className='book-search-input' type="text" placeholder="Search for a book" />
            <button className='book-search-btn' type="submit">Search</button>
        </form>
    </div>
  )
}
