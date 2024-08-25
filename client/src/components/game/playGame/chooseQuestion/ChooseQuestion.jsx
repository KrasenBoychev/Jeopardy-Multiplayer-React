import { useChatContext } from "stream-chat-react";

import "./chooseQUestion.css";

import QuestionModel from "./QuestionModel";

export default function ChooseQuestion({ props }) {
  const {
    categoriesInfo,
    activePlayer,
    setActivePlayer,
    firstPlayer,
    secondPlayer,
  } = props;

  const { client } = useChatContext();

  const points = [5, 10, 15, 20];

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

      <div className="categories-container">
        {Object.values(categoriesInfo).map((categoryValue) => {
          return (
            <QuestionModel
              key={categoryValue.category}
              props={{ categoryValue }}
            />
          );
        })}
      </div>
      <div className="questions-container">
        {points.map((pointsQuestion) => {
          return (
            <div key={pointsQuestion * 10}>
              {points.map((p, index) => {
                return <QuestionModel key={pointsQuestion + index} props={{ pointsQuestion }} />;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
