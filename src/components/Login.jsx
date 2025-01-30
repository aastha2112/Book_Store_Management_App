import axios from "axios";
import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(username, password);
    axios({
      url: `https://buttery-chiseled-child.glitch.me/login`,
      method: "POST",
      data: {
        username,
        password,
      },
    })
      .then((res) => {
        console.log(typeof res.data.token);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => setError(true))
      .finally(() => {
        setUsername("");
        setPassword("");
      });
  }
  return (
    <div className="loginFormDiv">
      <h3>Login Page</h3>
      <form onSubmit={handleSubmit} className="loginForm">
        {error && <p>Invalid Credentials!</p>}
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          placeholder="Enter USername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input type="submit" value={"Login"} />
      </form>
    </div>
  );
}
