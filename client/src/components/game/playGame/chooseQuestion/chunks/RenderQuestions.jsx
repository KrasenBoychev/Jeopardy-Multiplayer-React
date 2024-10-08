import { useChatContext } from "stream-chat-react";

import QuestionModel from "./QuestionModel";

export default function RenderQuestions({ props }) {
  const {
    activePlayer,
    firstPlayer,
    secondPlayer,
    pointsFirstPlayer,
    pointsSecondPlayer,
    questions,
  } = props;

  const { client } = useChatContext();

  return (
    <div className="gameContainer">
      <p
        className={
          client.user.name === activePlayer
            ? "activeCat player-categories"
            : "inactiveCat player-categories"
        }
      >
        {activePlayer} chooses question
      </p>
      <p className="players-points">
        <span className="points-first-player">{firstPlayer}: {pointsFirstPlayer} points</span>
        <span className="points-second-player">{secondPlayer}: {pointsSecondPlayer} points</span>
      </p>
      <div className="categories-container">
        {Object.keys(questions).map((categoryName) => {
          return <QuestionModel key={categoryName} props={{ categoryName }} />;
        })}
      </div>
      <div className="questions-container">
        {Object.entries(questions).map((item, indexItem) => {
          return (
            <div key={indexItem}>
              {Object.values(questions).map((question, indexQuestion) => {
                return (
                  <QuestionModel
                    key={question + indexQuestion}
                    props={{
                      activePlayer,
                      categoryName: Object.keys(questions)[indexQuestion],
                      question: question[indexItem].question,
                      questionAnswered: question[indexItem].answered,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
