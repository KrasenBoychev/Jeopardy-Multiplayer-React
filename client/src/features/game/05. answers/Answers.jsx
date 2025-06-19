import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectQuestionChosen,
  updateQuestionAnswered,
  updateQuestionChosen,
} from "../04. questions/questionsSlice";
import { deleteAnswerDetails, selectIsAnswerCorrect } from "./answerSlice";
import {
  selectActivePlayer,
  selectFirstPlayer,
  updateActivePlayer,
  updatePlayerPoints,
} from "../playersSlice";
import AnswersHeader from "./AnswersHeader";
import AnswersBody from "./AnswersBody";
import "../game.css";
import "./answers.css";

export default function Answers() {
  const question = useSelector(selectQuestionChosen);
  const isAnswerCorrect = useSelector(selectIsAnswerCorrect);
  const firstPlayer = useSelector(selectFirstPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAnswerCorrect != null) {
      if (isAnswerCorrect == true) {
        let playerToUpdate =
          activePlayer.username == firstPlayer.username
            ? "firstPlayer"
            : "secondPlayer";

        dispatch(
          updatePlayerPoints({
            player: playerToUpdate,
            pointsToAdd: question.points,
          })
        );
      }

      setTimeout(() => {
        dispatch(updateQuestionChosen(null));
        dispatch(deleteAnswerDetails());
        dispatch(updateQuestionAnswered(question));
        dispatch(updateActivePlayer());
      }, 1000);
    }
  }, [isAnswerCorrect]);

  return (
    <section className="show_question_container">
      <AnswersHeader />
      <div className="show_question_wrapper">
        <h1>{question.name}</h1>
        <div className="answers_wrapper">
          {Object.values(question.answers).map((answer, index) => {
            return <AnswersBody key={answer + index} answer={answer} />;
          })}
        </div>
      </div>
    </section>
  );
}
