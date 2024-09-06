import { useEffect, useState } from "react";

import { useChannelStateContext, useChatContext } from "stream-chat-react";

import "./chooseQUestion.css";

import { points } from "../../../../common/gamePoints";

import QuestionModel from "./QuestionModel";
import ShowQuestion from "../answerQuestion/ShowQuestion";

export default function ChooseQuestion({ props }) {
  const {
    categoriesInfo,
    activePlayer,
    setActivePlayer,
    firstPlayer,
    secondPlayer,
    questions,
    allCategoriesInfo,
  } = props;

  const [showQuestion, setShowQuestion] = useState(false);
  const [currCategory, setCurrCategory] = useState("");
  const [currQuestion, setCurrQuestion] = useState("");

  const [pointsFirstPlayer, setPointsFirstPlayer] = useState(0);
  const [pointsSecondPlayer, setPointsSecondPlayer] = useState(0);

  const { client } = useChatContext();
  const { channel } = useChannelStateContext();

  channel.on((event) => {
    if (
      event.type == "choose-question" &&
      event.user.name === event.data.activePlayer
    ) {
      setShowQuestion(true);
      setCurrCategory(event.data.categoryName);
      setCurrQuestion(event.data.question);
    }

    if (
      event.type == "choose-answer" &&
      event.user.name === event.data.activePlayer
    ) {

      setShowQuestion(false);
      setCurrCategory("");
      setCurrQuestion("");
    }
  });

  return (
    <>
      {showQuestion ? (
        <ShowQuestion
          props={{
            activePlayer,
            currCategory,
            currQuestion,
          }}
        />
      ) : (
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
            {Object.keys(questions).map((categoryName) => {
              return (
                <QuestionModel key={categoryName} props={{ categoryName }} />
              );
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
                          question: question[indexItem],
                        }}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
