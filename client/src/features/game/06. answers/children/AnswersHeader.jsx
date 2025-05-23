import { useAuthContext } from "../../../../contexts/AuthContext";
import "../answers.css";
import "../../game.css";

export default function AnswersHeader({ props }) {
  const { activePlayer, isAnswerCorrect, currCategory, currQuestion } = props;
  const { username } = useAuthContext();
  return (
    <>
      <p
        className={
          isAnswerCorrect == null
            ? username === activePlayer
              ? "player_categories active_player"
              : "player_categories"
            : isAnswerCorrect
            ? "player_categories answer_correct"
            : "player_categories answer_wrong"
        }
      >
        {isAnswerCorrect == null
          ? `${activePlayer} answers question`
          : isAnswerCorrect
          ? "Correct Answer"
          : "Wrong Answer"}
      </p>

      <div className="show_question_category">
        <h3>
          {currCategory} - {currQuestion.points} points
        </h3>
      </div>
    </>
  );
}
