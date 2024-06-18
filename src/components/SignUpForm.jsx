import { useState } from "react";


export default function SignUpForm({token, setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    if (username.length < 8) {
      setUsernameError("Your Username must be at least 8 characters.");
      return;
    } else {
      setUsernameError("");
    }

    if (password.length < 8) {
      setPasswordError("Your Password must be at least 8 characters.");
      return;
    } else {
      setPasswordError("");
    }

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json",
           },
          body: JSON.stringify({ username, password }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      const result = await response.json();
      console.log(result);
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div>
     <h2>Sign Up!</h2> 
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{""}<br/>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /> 
        </label>
        <br />
        {usernameError && <p style={{ color: "red" }}>{usernameError}</p>}
        <label>
          Password:{""}<br/>
          <input
            type={password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        {passwordError && <p style={{ color: "red" }}>{passwordError}</p>}
          <button type="submit">Login</button><br/>
      </form>
    </div>
  );
}
