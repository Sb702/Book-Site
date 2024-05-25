import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";
import './Login.css'

export default function Login({
  setCreateUser,
  createUser,
  setUser,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
        navigate("/home");
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
    <div className="login-wrap">
      <div className="wrap">
      <h1>Welcome to Bookly! Sign in below</h1>
      <p>Your companion for curating a personal reading list with ai based on your favorite previous reads!</p>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
        <button type="submit" className="btn">Sign In</button>
      </form>
      <button className="btn" onClick={handleSetCreateUser}>Create Account</button>
      {createUser ? <CreateUser /> : null}
      </div>
    </div>
  );
}
