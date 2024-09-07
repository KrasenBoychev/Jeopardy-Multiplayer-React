import { useChannelStateContext, useChatContext } from "stream-chat-react";

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
    isAnswerClicked
  } = props;

  const { client } = useChatContext();
  const { channel } = useChannelStateContext();

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
    <div className="gameContainer">
      <p
        className={
          isAnswerCorrect == null
            ? client.user.name === activePlayer
              ? "player-categories activeCat"
              : "player-categories inactiveCat"
            : isAnswerCorrect
              ? "player-categories answer-correct"
              : "player-categories answer-wrong"
        }
      >
        {isAnswerCorrect == null
          ? `${activePlayer} answers question`
          : isAnswerCorrect
          ? "Correct Answer"
          : "Wrong Answer"}
      </p>
      <div className="categories-container">
        <h3>
          {currCategory} - {currQuestion.points} points
        </h3>

        <div className="question-wrapper activeCat">
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
                            ? "answer-box answer-correct-question-wrong"
                            : "answer-box answer-wrong"
                          : "answer-box"
                  }
                >
                  {answer}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
