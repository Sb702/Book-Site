import React from 'react'
import ChatContainer from './AI/ChatContainer'
import BookContainer from './UserBooks/BookContainer'
import Navigation from './Nav/Navigation'
import './Homescreen.css'

export default function Homescreen({ user }) {
  return (
    <div>
      <Navigation />
      <h1 className='header'>Welcome to Bookly, {user.userName}!</h1>
      {/* <ChatContainer /> */}
      <BookContainer user={user} />
    </div>
  )
}
