import { useState } from "react";
import { loginWithEmail } from "./authService";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginWithEmail(email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Kirjaudu sisään</h2>

      <div>
        <label>Sähköposti</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <br />

      <div>
        <label>Salasana</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <br />

      <button type="submit">
        Kirjaudu
      </button>
    </form>
  );
}

export default LoginForm;