import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import QuizForm from "./components/QuizForm.jsx";
import RoundResult from "./components/RoundResult.jsx";
import { fetchRandomProduct } from "./ProductService.js";
import { calculatePoints } from "./gameController.js";
import LoginForm from "./LoginForm";
import { auth, logout } from "./authService";

function App() {
  const [user, setUser] = useState(null);
  const [codename, setCodename] = useState("");
  const [guess, setGuess] = useState(null);
  const [product, setProduct] = useState(null);
  const [round, setRound] = useState(1);
  const [score, setScore] = useState(0);

  const generateCodename = () => {
    const adjectives = [
      "Sneaky",
      "Silent",
      "Crazy",
      "Fast",
      "Happy",
    ];

    const animals = [
      "Panda",
      "Wolf",
      "Tiger",
      "Fox",
      "Eagle",
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
  useEffect(() => {
  async function loadProduct() {

    const randomProduct =
      await fetchRandomProduct();

    setProduct(randomProduct);
  }

  loadProduct();

}, []);
useEffect(() => {
  if (guess !== null && product) {
    const points = calculatePoints(
      guess,
      product.price
    );

    setScore((prev) => prev + points);
  }
}, [guess, product]);


async function nextRound() {

  if (round >= 3) {
    alert(
  `Peli päättyi! Kokonaispisteesi: ${Math.round(score)}`
);
    return;
  }

  const randomProduct =
    await fetchRandomProduct();

  setProduct(randomProduct);

  setGuess(null);

  setRound(round + 1);
}
  return (
    <div>
      <h1>Firebase Login Demo</h1>

      {user ? (
        <>
          <p>👋 Tervetuloa, {codename}</p>
          <p>Kierros: {round}</p>
          <p>Pisteet: {Math.round(score)}</p>


          <button onClick={logout}>
            Kirjaudu ulos
          </button>

          {product && (
  <>
    <h2>{product.title}</h2>

    <img
      src={product.thumbnail}
      alt={product.title}
      width="200"
    />

    <QuizForm
      onSubmitGuess={setGuess}
    />
  </>
)}

          {guess && (
  <RoundResult
    guess={guess}
    correctPrice={product.price}
    onNextRound={nextRound}
  />
)}
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;