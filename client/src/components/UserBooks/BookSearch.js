import React from 'react'


export default function BookSearch({ setBooks }) {
    const handleSearch = async (e) => {
        e.preventDefault()
        console.log("searching for book")
        const search = await fetch('http://localhost:3000/search', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token'),
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
        <form onSubmit={handleSearch} className='flex justify-center gap-5'> 
            {/* <input className='book-search-input' type="text" placeholder="Search for a book" /> */}
            <input className='input input-bordered input-primary w-1/2 max-w-xs' type="text" placeholder="Search for a book" />
            <button className='btn btn-primary'>Search</button>
        </form>
    </div>
  )
}
