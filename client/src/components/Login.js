import { useState } from "react";

export default function Login({
  setIsLoggedIn,
  setCreateUser,
  createUser,
  setUser,
}) {
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
    .then((res) => res.json())
    .then((data) => {
      if (data && !data.error) {
        setIsLoggedIn(true);
        setUser(data);
      } else {
        console.error(data.error);
      }
    })
    .catch((err) => {
      console.log(err);
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
      <button onClick={handleSetCreateUser}>Create Account</button>
    </div>
  );
}
