import { useEffect } from "react";

import { useChannelStateContext, useChatContext } from "stream-chat-react";

import "./showQuestion.css";

export default function ({ props }) {
  const {
    activePlayer,
    currCategory,
    currQuestion,
  } = props;

  const { client } = useChatContext();
  const { channel } = useChannelStateContext();

  const answerQuestionClickHandler = async () => {
    await channel.sendEvent({
      type: "choose-answer",
      data: {
        activePlayer,
        pointsWon: currQuestion.points
      },
    });
  };

  return (
    <div className="gameContainer">
      <p
        className={
          client.user.name === activePlayer
            ? "activeCat player-categories"
            : "inactiveCat player-categories"
        }
      >
        {activePlayer} answers question
      </p>
      <div className="categories-container">
        <h3>
          {currCategory} - {currQuestion.points} points
        </h3>

        <div className="question-wrapper activeCat">
          <h1>{currQuestion.name}</h1>

          <div className="answers-wrapper">
            {Object.values(currQuestion.answers).map((answer, index) => {
              return (
                index < 4 && (
                  <p
                    key={answer}
                    onClick={answerQuestionClickHandler}
                    className={
                      client.user.name === activePlayer
                        ? "answer-box-active"
                        : "answer-box-inactive"
                    }
                  >
                    {answer}
                  </p>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
