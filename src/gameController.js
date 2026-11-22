export function calculatePoints(
  guess,
  correctPrice
) {
  return Math.max(
    0,
    100 - Math.abs(
      guess - correctPrice
    )
  );
}