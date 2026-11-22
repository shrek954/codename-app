function RoundResult({
  guess,
  correctPrice,
  onNextRound,
}) {

  return (
    <div>
      <p>
        Arvauksesi: {guess} €
      </p>

      <p>
        Oikea hinta:
        {correctPrice} €
      </p>

      <p>
        Erotus:
        {Math.abs(
          guess - correctPrice
        )} €
      </p>

      <button
        onClick={onNextRound}
      >
        Seuraava kierros
      </button>
    </div>
  );
}

export default RoundResult;