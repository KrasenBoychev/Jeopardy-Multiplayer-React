import { useState } from "react";
import QuestionsOrAnswers from "./QuestionsOrAnswers";
import ResultGame from "../08. final_result/ResultGame";
import useGameFinished from "../../../hooks/game_hooks/useGameFinished";

export default function QuestionsOrResult({ props }) {
  const { activePlayer, setActivePlayer, questions, setQuestions } = props;

  const [gameFinished, setGameFinished] = useState(false);
  const [pointsFirstPlayer, setPointsFirstPlayer] = useState(0);
  const [pointsSecondPlayer, setPointsSecondPlayer] = useState(0);

  useGameFinished(gameFinished, pointsFirstPlayer, pointsSecondPlayer);

  return (
    <>
      {gameFinished ? (
        <ResultGame
          props={{
            pointsFirstPlayer,
            pointsSecondPlayer,
          }}
        />
      ) : (
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
