import { useDispatch, useSelector } from "react-redux";
import {
  selectQuestionChosen,
  updateQuestionAnswered,
  updateQuestionChosen,
} from "../05. questions/questionsSlice";
import AnswersHeader from "./children/AnswersHeader";
import AnswerModel from "./children/AnswerModel";
import "../game.css";
import "./answers.css";
import { useEffect } from "react";
import { deleteAnswerDetails, selectIsAnswerCorrect } from "./answerSlice";
import {
  selectActivePlayer,
  selectFirstPlayer,
  updateActivePlayer,
  updatePlayerPoints,
} from "../playersSlice";

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
      }, 3000);
    }
  }, [isAnswerCorrect]);

  return (
    <section className="show_question_container">
      <AnswersHeader />
      <div className="show_question_wrapper">
        <h1>{question.name}</h1>
        <div className="answers_wrapper">
          {Object.values(question.answers).map((answer, index) => {
            return <AnswerModel key={answer + index} answer={answer} />;
          })}
        </div>
      </div>
    </section>
  );
}
