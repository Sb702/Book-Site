import React, { useEffect } from 'react'
import ChatContainer from './AI/ChatContainer'
import BookContainer from './UserBooks/BookContainer'
import Navigation from './Nav/Navigation'
import { useNavigate } from 'react-router-dom'

export default function Homescreen({ user, setUser }) {

  const navigate = useNavigate();

useEffect(() => {
  fetch("http://localhost:3000/protect", {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Not authorized');
      }
      return res.json();
    })
    .then((data) => {
      if (data && !data.error) {
        // console.log(data.user);
      }
    })
    .catch((err) => {
      // if there is an error we need to navigate to the login screen
      console.log(err);
      alert("You are not authorized to access this page.")
      navigate("/");
    });
}, []);

  function handleLogout() {
    localStorage.removeItem("token");
    setUser({})
    navigate("/");
  }

  return (
    <div>
      <Navigation handleLogout={handleLogout}/>
      <h1 className='text-4xl text-center p-7 text-primary'>Welcome to Bookly, {user.userName}!</h1>
      {/* <ChatContainer /> */}
      <BookContainer user={user} />
    </div>
  )
}
