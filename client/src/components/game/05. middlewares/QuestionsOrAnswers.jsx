import Score from "../../score/Score";
import Timer from "../../timer/Timer";
import Questions from "../06. questions/Questions";
import QuestionModel from "./QuestionModel";
import QuestionsHeader from "./QuestionsHeader";

export default function QuestionsOrAnswers({ props }) {
  const {
    activePlayer,
    pointsFirstPlayer,
    pointsSecondPlayer,
    questions,
    setShowQuestion,
    setCurrCategory,
    setCurrQuestion,
  } = props;

  return (
    <div className="questions_page_wrapper">
      <Score points={{ pointsFirstPlayer, pointsSecondPlayer }} />

      {showQuestion ? (
        <Answers
          props={{
            activePlayer,
            currCategory,
            currQuestion,
            pointsFirstPlayer,
            pointsSecondPlayer,
            isAnswerCorrect,
            isAnswerClicked,
          }}
        />
      ) : (
        <Questions />
      )}
      <Timer />
    </div>
  );
}
