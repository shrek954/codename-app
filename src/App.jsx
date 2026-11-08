import { useState } from "react";

function App() {
  const [codename, setCodename] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  function generateCodename() {
    const adjectives = ["Sneaky", "Happy", "Crazy", "Silent", "Mighty"];
    const animals = ["Panda", "Fox", "Tiger", "Koala", "Otter"];

    const adjective =
      adjectives[Math.floor(Math.random() * adjectives.length)];

    const animal =
      animals[Math.floor(Math.random() * animals.length)];

    const number =
      Math.floor(Math.random() * 100);

    return `${adjective}${animal}${number}`;
  }

  function login() {
    let cachedName = localStorage.getItem("codename");

    if (!cachedName) {
      cachedName = generateCodename();
      localStorage.setItem("codename", cachedName);
    }

    setCodename(cachedName);
    setLoggedIn(true);
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Koodinimigeneraattori</h1>

      {!loggedIn ? (
        <button onClick={login}>
          Kirjaudu sisään
        </button>
      ) : (
        <div>
          <h2>Tervetuloa!</h2>
          <p>Sinun koodinimesi on:</p>
          <h3>{codename}</h3>
        </div>
      )}
    </div>
  );
}

export default App;