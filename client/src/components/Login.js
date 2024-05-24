import { useState } from "react";

export default function Login({ setIsLoggedIn, setCreateUser, createUser}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        if (data === "User logged in successfully") {
          setIsLoggedIn(true);
        }
      });
  }

  function handleSetCreateUser() {
    setCreateUser(!createUser);
  }

  
  return (
    <div>
      <h1>Welcome to Bookly! Sign in below</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Sign In</button>
      </form>
      <button onClick={handleSetCreateUser} >
        Create Account 
        </button>
    </div>
  );
}
