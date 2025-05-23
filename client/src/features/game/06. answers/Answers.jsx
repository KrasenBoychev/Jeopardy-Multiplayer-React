import useAnswerClicked from "../../../hooks/game_hooks/useAnswerClicked";
import AnswerModel from "./children/AnswerModel";
import AnswersHeader from "./children/AnswersHeader";
import "../game.css";
import "./answers.css";

export default function Answers({ props }) {
  const {
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
  } = props;

  const setAnswerClicked = useAnswerClicked(
    activePlayer,
    currQuestion,
    isAnswerClicked,
    setActivePlayer,
    setPointsFirstPlayer,
    setPointsSecondPlayer,
    setIsAnswerClicked,
    setIsAnswerCorrect,
    setRecordAnswer
  );

  return (
    <section className="show_question_container">
      <AnswersHeader
        props={{ activePlayer, isAnswerCorrect, currCategory, currQuestion }}
      />

      <div className="show_question_wrapper">
        <h1>{currQuestion.name}</h1>

        <div className="answers_wrapper">
          {Object.values(currQuestion.answers).map((answer, index) => {
            return (
              <AnswerModel
                key={answer + index}
                props={{
                  answer,
                  index,
                  setAnswerClicked,
                  activePlayer,
                  currQuestion,
                  isAnswerClicked,
                  setIsAnswerClicked,
                  isAnswerCorrect,
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
