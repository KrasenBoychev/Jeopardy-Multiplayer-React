import { useAuthContext } from "../../../contexts/AuthContext";
import { useGameContext } from "../../../contexts/GameContext";
import "../game.css";
import "./answers.css";

export default function Answers({ props }) {
  const {
    activePlayer,
    currCategory,
    currQuestion,
    pointsFirstPlayer,
    pointsSecondPlayer,
    isAnswerCorrect,
    isAnswerClicked,
  } = props;

  const { username } = useAuthContext();
  const { firstPlayerUsername } = useGameContext();

  const answerQuestionClickHandler = async (e) => {
    // TO DO
    let pointsWon = 0;
    let totalPoints = 0;

    if (e.target.textContent == currQuestion.correctAnswer) {
      pointsWon = currQuestion.points;
    }

    if (activePlayer == firstPlayerUsername) {
      totalPoints = pointsFirstPlayer + pointsWon;
    } else {
      totalPoints = pointsSecondPlayer + pointsWon;
    }
  };

  return (
    <div className="show_question_container">
      <p
        className={
          isAnswerCorrect == null
            ? username === activePlayer
              ? "player_categories active_player"
              : "player_categories"
            : isAnswerCorrect
            ? "answer_correct player_categories "
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

      <div className="show_question_wrapper activeCat">
        <h1>{currQuestion.name}</h1>

        <div className="answers_wrapper">
          {Object.values(currQuestion.answers).map((answer) => {
            return (
              <button
                key={answer}
                disabled={isAnswerClicked ? true : false}
                onClick={answerQuestionClickHandler}
                className={
                  isAnswerCorrect == null
                    ? username === activePlayer
                      ? "answer_box answer_box_active"
                      : "answer_box"
                    : isAnswerCorrect && currQuestion.correctAnswer == answer
                    ? "answer_box answer_correct"
                    : !isAnswerCorrect
                    ? currQuestion.correctAnswer == answer
                      ? "answer_box answer_correct"
                      : "answer_box answer_wrong"
                    : "answer_box inactive_player"
                }
              >
                {answer}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
