import { useEffect, useState } from "react";

import { useChannelStateContext, useChatContext } from "stream-chat-react";

import "./chooseQUestion.css";

import { points } from "../../../../common/gamePoints";

import QuestionModel from "./QuestionModel";
import ShowQuestion from "../answerQuestion/ShowQuestion";

export default function ChooseQuestion({ props }) {
  const {
    activePlayer,
    setActivePlayer,
    firstPlayer,
    secondPlayer,
    questions,
    setQuestions,
  } = props;

  const [showQuestion, setShowQuestion] = useState(false);
  const [currCategory, setCurrCategory] = useState("");
  const [currQuestion, setCurrQuestion] = useState("");

  const [pointsFirstPlayer, setPointsFirstPlayer] = useState(0);
  const [pointsSecondPlayer, setPointsSecondPlayer] = useState(0);

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isAnswerClicked, setIsAnswerClicked] = useState(false);
  const [callShowAnswer, setCallShowAnswer] = useState(false);

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
      setIsAnswerClicked(true);

      if (event.data.pointsWon > 0) {
        setIsAnswerCorrect(true);
      } else {
        setIsAnswerCorrect(false);
      }

      if (event.data.activePlayer == firstPlayer) {
        setPointsFirstPlayer(event.data.totalPoints);
      } else {
        setPointsSecondPlayer(event.data.totalPoints);
      }

      callShowAnswer ? setCallShowAnswer(false) : setCallShowAnswer(true);

      event.data.activePlayer == firstPlayer
        ? setActivePlayer(secondPlayer)
        : setActivePlayer(firstPlayer);
    }
  });

  useEffect(() => {
    (function showAnswers() {
      if (currCategory && currQuestion) {
        setTimeout(() => {
          setShowQuestion(false);

          const copyQuestions = { ...questions };

          let findQuestion;

          Object.values(copyQuestions).forEach((copiedQuestions) => {
            const result = copiedQuestions.filter(
              (questionInfo) => questionInfo.question._id == currQuestion._id
            );

            if (result.length > 0) {
              findQuestion = result;
            }
          });

          findQuestion[0].answered = true;

          setQuestions(copyQuestions);
          setCurrCategory("");
          setCurrQuestion("");
          setIsAnswerCorrect(null);
          setIsAnswerClicked(false);
        }, 3000);
      }
    })();
  }, [callShowAnswer]);

  return (
    <>
      {showQuestion ? (
        <ShowQuestion
          props={{
            activePlayer,
            currCategory,
            currQuestion,
            firstPlayer,
            pointsFirstPlayer,
            pointsSecondPlayer,
            isAnswerCorrect,
            isAnswerClicked,
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
            {activePlayer} chooses question (
            {activePlayer == firstPlayer
              ? pointsFirstPlayer
              : pointsSecondPlayer} <span className="points-box">points</span>
              
            )
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
      )}
    </>
  );
}
