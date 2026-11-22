export const createSession = () => ({
  status: "waiting",
  players: [],
  currentRound: 1,
  maxRounds: 3,
  correctPrice: null
});