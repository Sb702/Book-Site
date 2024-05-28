import React, { useEffect } from 'react'
import Navigation from '../components/Nav/Navigation'
import UserBookRender from '../components/UserBooks/UserBookRender'
import { useNavigate } from 'react-router-dom';

export default function UserBooks({ user, userBooks, setUserBooks}) {

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
  
  return (
    
    <div>
      <Navigation />
      <UserBookRender user={user} userBooks={userBooks} setUserBooks={setUserBooks} />
    </div>
  )
}
