import { createContext, useContext } from "react";

export const GameContext = createContext({
  socket: null,
  friendUsername: null,
  friendSocketId: null,
  firstPlayerUsername: null,
  secondPlayerUsername: null,
});

export function useGameContext() {
  const gameData = useContext(GameContext);

  return gameData;
}
