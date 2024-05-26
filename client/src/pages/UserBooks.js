import React from 'react'
import Navigation from '../components/Nav/Navigation'
import UserBookRender from '../components/UserBooks/UserBookRender'

export default function UserBooks({ user, userBooks, setUserBooks}) {
  return (
    
    <div>
      <Navigation />
      <UserBookRender user={user} userBooks={userBooks} setUserBooks={setUserBooks} />
    </div>
  )
}
