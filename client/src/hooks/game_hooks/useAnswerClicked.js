import { useEffect, useState } from "react";
import { useGameContext } from "../../contexts/GameContext";

export default function useAnswerClicked(
  activePlayer,
  currQuestion,
  isAnswerClicked,
  setActivePlayer,
  setPointsFirstPlayer,
  setPointsSecondPlayer,
  setIsAnswerClicked,
  setIsAnswerCorrect,
  setRecordAnswer
) {
  const [answerClicked, setAnswerClicked] = useState(null);
  const { socket, firstPlayerUsername, secondPlayerUsername } =
    useGameContext();

  useEffect(() => {
    socket?.on("getAnswerClicked", ({ answerChosen }) => {
      setAnswerClicked(answerChosen);
      setIsAnswerClicked(true);
    });
  }, [socket]);

  useEffect(() => {
    if (isAnswerClicked) {
      (async function questionAnswered() {
        let pointsWon = 0;

        if (answerClicked == currQuestion.correctAnswer) {
          pointsWon = currQuestion.points;
        }

        if (pointsWon > 0) {
          setIsAnswerCorrect(true);
        } else {
          setIsAnswerCorrect(false);
        }

        if (activePlayer == firstPlayerUsername) {
          setPointsFirstPlayer((points) => points + pointsWon);
          setActivePlayer(secondPlayerUsername);
        } else {
          setPointsSecondPlayer((points) => points + pointsWon);
          setActivePlayer(firstPlayerUsername);
        }

        setRecordAnswer(true);
      })();
    }
  }, [isAnswerClicked]);

  return setAnswerClicked;
}
