import { createContext, useContext } from "react";

export const GameContext = createContext({
  channel: null,
  setChannel: null,
  client: null,
  rivalPlayer: null,
  setIsNewGameStarted: null,
});

export function useGameContext() {
  const gameData = useContext(GameContext);

  return gameData;
}
