import useChooseQuestion from "../../../hooks/useChooseQuestion";
import ShowQuestion from "../06. answer_question/ShowQuestion";
import RenderQuestions from "./chunks/RenderQuestions";
import ResultGame from "../07. final_result/ResultGame";

import "./chooseQUestion.css";

export default function ChooseQuestion({ props }) {
  const {
    activePlayer,
    setActivePlayer,
    firstPlayer,
    secondPlayer,
    questions,
    setQuestions,
  } = props;

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
  ] = useChooseQuestion(questions, setQuestions, firstPlayer);

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
      ) : showQuestion ? (
        <ShowQuestion
          props={{
            activePlayer,
            currCategory,
            currQuestion,
            firstPlayer,
            pointsFirstPlayer,
            pointsSecondPlayer,
            isAnswerCorrect,
            isAnswerClicked,
          }}
        />
      ) : (
        <RenderQuestions
          props={{
            activePlayer,
            firstPlayer,
            secondPlayer,
            pointsFirstPlayer,
            pointsSecondPlayer,
            questions,
          }}
        />
      )}
    </>
  );
}
