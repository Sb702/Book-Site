import { useState } from "react";

export default function CreateUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleRegisterUser(e) {
    e.preventDefault();

    fetch("http://localhost:3000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: name,
        email,
        password,
      }),
    })
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <div>
      <h1>Welcome to Bookly! Register below</h1>
      <form onSubmit={handleRegisterUser}>
        <input
          type="text"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
