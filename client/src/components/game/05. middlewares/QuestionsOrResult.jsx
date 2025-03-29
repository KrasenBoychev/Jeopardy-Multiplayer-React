import { useEffect, useState } from "react";
import ResultGame from "../08. final_result/ResultGame";
import QuestionsOrAnswers from "./QuestionsOrAnswers";

export default function QuestionsOrResult({ props }) {
  const { activePlayer, setActivePlayer, questions, setQuestions } = props;

  const [gameFinished, setGameFinished] = useState(false);
  const [pointsFirstPlayer, setPointsFirstPlayer] = useState(0);
  const [pointsSecondPlayer, setPointsSecondPlayer] = useState(0);

  useEffect(() => {
    if (gameFinished) {
      (async function finishGame() {
        // TO DO: adapt the code
        // try {
        //   if (authData.username == friendUsername) {
        //     await recordPoints(authData.userId, pointsFirstPlayer);
        //   } else {
        //     await recordPoints(authData.userId, pointsSecondPlayer);
        //   }
        //   const playerPoints = await getPlayerPoints();
        //   authData.points = playerPoints;
        //   authData.changeAuthState(authData);
        // } catch (error) {
        //   toast.error(
        //     "Points could not be added to your account. Please contact our Customer Service Team."
        //   );
        //   return;
        // }
      })();
    }
  }, [gameFinished]);

  return (
    <>
      {gameFinished ? (
        <p>result</p>
      ) : (
        // <ResultGame
        //   props={{
        //     firstPlayer,
        //     secondPlayer,
        //     pointsFirstPlayer,
        //     pointsSecondPlayer,
        //   }}
        // />
        <QuestionsOrAnswers
          props={{
            activePlayer,
            setActivePlayer,
            questions,
            setQuestions,
            setGameFinished,
            pointsFirstPlayer,
            setPointsFirstPlayer,
            pointsSecondPlayer,
            setPointsSecondPlayer,
            setGameFinished,
          }}
        />
      )}
    </>
  );
}
