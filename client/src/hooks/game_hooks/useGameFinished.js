import { useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import { useGameContext } from "../../contexts/GameContext";
import { recordPoints } from "../../../api/game-api";
import toast from "react-hot-toast";

export default function useGameFinished(
  gameFinished,
  pointsFirstPlayer,
  pointsSecondPlayer
) {
  const authData = useAuthContext();
  const { firstPlayerUsername } = useGameContext();

  useEffect(() => {
    if (gameFinished) {
      (async function finishGame() {
        try {
          let playerPoints = null;

          if (authData.username == firstPlayerUsername) {
            playerPoints = await recordPoints(
              authData.userId,
              pointsFirstPlayer
            );
          } else {
            playerPoints = await recordPoints(
              authData.userId,
              pointsSecondPlayer
            );
          }

          authData.points = playerPoints;
          authData.changeAuthState(authData);
        } catch (error) {
          toast.error(
            "Points could not be added to your account. Please contact our Customer Service Team."
          );
          return;
        }
      })();
    }
  }, [gameFinished]);
}
