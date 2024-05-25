import React from 'react'
import Navigation from '../components/Nav/Navigation'
import UserBookRender from '../components/UserBooks/UserBookRender'

export default function UserBooks({ user }) {
  return (
    
    <div>
      <Navigation />
      <UserBookRender user={user} />
    </div>
  )
}
