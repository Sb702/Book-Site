import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateUser from "./CreateUser";


export default function Login({
  setCreateUser,
  createUser,
  setUser,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);

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
        setUser(data.user);
        setLoginSuccess(true);
        localStorage.setItem("token", data.token);
        console.log(localStorage.getItem("token"));
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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-slate-700 p-20 rounded-md">
      <h1 className="text-4xl">Welcome to Bookly! Sign in below</h1>
      <p className="text-xl">Your companion for curating a personal reading list with ai based on your favorite previous reads!</p>
      <form onSubmit={handleLogin} className="login-form">
        <div className="flex gap-5 justify-center p-5">
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
        <button type="submit" className="btn btn-primary">Sign In</button>
        </div>
      </form>
      <div className="flex justify-center">
      <button className="btn btn-primary" onClick={handleSetCreateUser}>Create Account</button>
      {createUser ? <CreateUser /> : null}
      </div>
      </div>
    </div>
  );
}
