
import {
  collection,
  addDoc
} from "firebase/firestore";

import { db } from "./firebase";

export async function createSession() {
  const newSession = {
    status: "waiting",
    players: [],
    currentRound: 1,
    maxRounds: 3,
    correctPrice: null,
    currentProduct: null,
    winnerCodename: null
  };

  const docRef = await addDoc(
    collection(db, "gameSessions"),
    newSession
  );

  return {
    id: docRef.id,
    ...newSession
  };
}
