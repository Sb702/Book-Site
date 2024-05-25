import React from 'react'
import ChatContainer from './AI/ChatContainer'
import BookContainer from './UserBooks/BookContainer'

export default function Homescreen({ user }) {
  return (
    <div>
      <h1>Welcome to Bookly, {user.userName}!</h1>
      {/* <ChatContainer /> */}
      <BookContainer user={user} />
    </div>
  )
}
