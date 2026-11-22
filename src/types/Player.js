export const createPlayer = (
  uid,
  codename
) => ({
  uid,
  codename,
  score: 0,
  guess: null
});