import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../authentication/authSlice";
import { selectActivePlayer } from "../../playersSlice";
import { selectIsAnswerCorrect } from "../answerSlice";
import "../answers.css";
import "../../game.css";
import { selectQuestionChosen } from "../../05. questions/questionsSlice";
import { selectCategories } from "../../04. categories/categoriesSlice";

export default function AnswersHeader() {
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectCurrentUser);
  const question = useSelector(selectQuestionChosen);
  const categories = useSelector(selectCategories);
  const isAnswerCorrect = useSelector(selectIsAnswerCorrect);

  const findCategoryName = categories.find(
    (category) => category._id == question.categoryId
  );

  return (
    <>
      <p
        className={
          isAnswerCorrect == null
            ? user.username === activePlayer.username
              ? "player_categories active_player"
              : "player_categories"
            : isAnswerCorrect
            ? "player_categories answer_correct"
            : "player_categories answer_wrong"
        }
      >
        {isAnswerCorrect == null
          ? `${activePlayer.username} answers question`
          : isAnswerCorrect
          ? "Correct Answer"
          : "Wrong Answer"}
      </p>

      <div className="show_question_category">
        <h3>
          {findCategoryName.name} - {question.points} points
        </h3>
      </div>
    </>
  );
}
