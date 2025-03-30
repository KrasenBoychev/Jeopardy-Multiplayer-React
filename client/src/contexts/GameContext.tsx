import { createContext, useContext } from "react";

interface GameContextType {
  socket: string | null
  friendUsername: string | null;
  friendSocketId: string | null;
  firstPlayerUsername: string | null;
  secondPlayerUsername: string | null;
}

export const GameContext = createContext({
  socket: null,
  friendUsername: null,
  friendSocketId: null,
  firstPlayerUsername: null,
  secondPlayerUsername: null,
});

export function useGameContext() {
  const gameData: GameContextType = useContext(GameContext);

  return gameData;
}
