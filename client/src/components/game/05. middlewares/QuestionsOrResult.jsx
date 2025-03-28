import useChooseQuestion from "../../../hooks/useChooseQuestion";
import Answers from "../07. answers/Answers";
import QuestionsPoints from "./children/QuestionsPoints";
import ResultGame from "../08. final_result/ResultGame";

import "./questions.css";
import QuestionsOrAnswers from "./QuestionsOrAnswers";

export default function QuestionsOrResult({ props }) {
  const { activePlayer, setActivePlayer, questions, setQuestions } = props;

  const [
    showQuestion,
    setShowQuestion,
    currCategory,
    setCurrCategory,
    currQuestion,
    setCurrQuestion,
    pointsFirstPlayer,
    setPointsFirstPlayer,
    pointsSecondPlayer,
    setPointsSecondPlayer,
    isAnswerCorrect,
    setIsAnswerCorrect,
    isAnswerClicked,
    setIsAnswerClicked,
    callShowAnswer,
    setCallShowAnswer,
    gameFinished,
  ] = useChooseQuestion(questions, setQuestions);

  // channel.on((event) => {
  //   if (
  //     event.type == "choose-question" &&
  //     event.user.name === event.data.activePlayer
  //   ) {
  //     setShowQuestion(true);
  //     setCurrCategory(event.data.categoryName);
  //     setCurrQuestion(event.data.question);
  //   }

  //   if (
  //     event.type == "choose-answer" &&
  //     event.user.name === event.data.activePlayer
  //   ) {
  //     setIsAnswerClicked(true);

  //     if (event.data.pointsWon > 0) {
  //       setIsAnswerCorrect(true);
  //     } else {
  //       setIsAnswerCorrect(false);
  //     }

  //     if (event.data.activePlayer == firstPlayer) {
  //       setPointsFirstPlayer(event.data.totalPoints);
  //     } else {
  //       setPointsSecondPlayer(event.data.totalPoints);
  //     }

  //     callShowAnswer ? setCallShowAnswer(false) : setCallShowAnswer(true);

  //     event.data.activePlayer == firstPlayer
  //       ? setActivePlayer(secondPlayer)
  //       : setActivePlayer(firstPlayer);
  //   }
  // });

  return (
    <>
      {gameFinished ? (
        <ResultGame
          props={{
            firstPlayer,
            secondPlayer,
            pointsFirstPlayer,
            pointsSecondPlayer,
          }}
        />
      ) : (
        <QuestionsOrAnswers />
      )}
    </>
  );
}
