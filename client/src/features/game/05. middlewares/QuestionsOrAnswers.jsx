import useSetQAndAValues from "../../../hooks/game_hooks/useSetQ&AValues";
import Score from "../score/Score";
import Timer from "../timer/Timer";
import Questions from "../06. questions/Questions";
import Answers from "../07. answers/Answers";

export default function QuestionsOrAnswers({ props }) {
  const {
    activePlayer,
    setActivePlayer,
    questions,
    setQuestions,
    pointsFirstPlayer,
    setPointsFirstPlayer,
    pointsSecondPlayer,
    setPointsSecondPlayer,
    setGameFinished,
  } = props;

  const [
    showQuestion,
    currCategory,
    currQuestion,
    isAnswerClicked,
    isAnswerCorrect,
    setShowQuestion,
    setCurrCategory,
    setCurrQuestion,
    setIsAnswerClicked,
    setIsAnswerCorrect,
    setRecordAnswer,
  ] = useSetQAndAValues(questions, setQuestions, setGameFinished);

  return (
    <div className="questions_page_wrapper">
      <Score points={{ pointsFirstPlayer, pointsSecondPlayer }} />

      {showQuestion ? (
        <Answers
          props={{
            activePlayer,
            currCategory,
            currQuestion,
            isAnswerClicked,
            isAnswerCorrect,
            setActivePlayer,
            setPointsFirstPlayer,
            setPointsSecondPlayer,
            setIsAnswerClicked,
            setIsAnswerCorrect,
            setRecordAnswer,
          }}
        />
      ) : (
        <Questions
          props={{
            activePlayer,
            questions,
            setShowQuestion,
            setCurrCategory,
            setCurrQuestion,
          }}
        />
      )}
      <Timer />
    </div>
  );
}
