import { useGameContext } from "../../../../contexts/GameContext";
import "../../play.css";
import "./showQuestion.css";

export default function ({ props }) {
  const {
    activePlayer,
    currCategory,
    currQuestion,
    firstPlayer,
    pointsFirstPlayer,
    pointsSecondPlayer,
    isAnswerCorrect,
    isAnswerClicked,
  } = props;

  const { channel, client } = useGameContext();

  const answerQuestionClickHandler = async (e) => {
    let pointsWon = 0;
    let totalPoints = 0;

    if (e.target.textContent == currQuestion.correctAnswer) {
      pointsWon = currQuestion.points;
    }

    if (activePlayer == firstPlayer) {
      totalPoints = pointsFirstPlayer + pointsWon;
    } else {
      totalPoints = pointsSecondPlayer + pointsWon;
    }

    await channel.sendEvent({
      type: "choose-answer",
      data: {
        activePlayer,
        pointsWon,
        totalPoints,
      },
    });
  };

  return (
    <div className="show-question-container">
      <p
        className={
          isAnswerCorrect == null
            ? client.user.name === activePlayer
              ? "player-categories active-player"
              : "player-categories"
            : isAnswerCorrect
            ? "answer-correct player-categories "
            : "player-categories answer-wrong"
        }
      >
        {isAnswerCorrect == null
          ? `${activePlayer} answers question`
          : isAnswerCorrect
          ? "Correct Answer"
          : "Wrong Answer"}
      </p>

      <div className="show-question-category">
        <h3>
          {currCategory} - {currQuestion.points} points
        </h3>
      </div>

      <div className="show-question-wrapper activeCat">
        <h1>{currQuestion.name}</h1>

        <div className="answers-wrapper">
          {Object.values(currQuestion.answers).map((answer) => {
            return (
              <button
                key={answer}
                disabled={isAnswerClicked ? true : false}
                onClick={answerQuestionClickHandler}
                className={
                  isAnswerCorrect == null
                    ? client.user.name === activePlayer
                      ? "answer-box answer-box-active"
                      : "answer-box"
                    : isAnswerCorrect && currQuestion.correctAnswer == answer
                    ? "answer-box answer-correct"
                    : !isAnswerCorrect
                    ? currQuestion.correctAnswer == answer
                      ? "answer-box answer-correct"
                      : "answer-box answer-wrong"
                    : "answer-box inactive-player"
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
