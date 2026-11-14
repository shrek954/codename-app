import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import LoginForm from "./LoginForm";
import { auth, logout } from "./authService";

function App() {
  const [user, setUser] = useState(null);
  const [codename, setCodename] = useState("");
  const generateCodename = () => {
  const adjectives = [
    "Sneaky",
    "Silent",
    "Crazy",
    "Fast",
    "Happy"
  ];

  const animals = [
    "Panda",
    "Wolf",
    "Tiger",
    "Fox",
    "Eagle"
  ];

  const adjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];

  const animal =
    animals[Math.floor(Math.random() * animals.length)];

  const number =
    Math.floor(Math.random() * 100);

  return `${adjective}${animal}${number}`;
};

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (firebaseUser) => {
  setUser(firebaseUser);

  if (firebaseUser) {
    const key = `codename_${firebaseUser.uid}`;

    let name = localStorage.getItem(key);

    if (!name) {
      name = generateCodename();

      localStorage.setItem(key, name);
    }

    setCodename(name);
  }
}
    );

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h1>Firebase Login Demo</h1>

      {user ? (
        <>
          <p>👋 Tervetuloa, {codename}</p>

          <button onClick={logout}>
            Kirjaudu ulos
          </button>
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;