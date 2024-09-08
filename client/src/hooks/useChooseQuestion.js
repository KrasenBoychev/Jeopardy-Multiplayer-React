import { useEffect, useState } from "react";

export default function useChooseQuestion(questions, setQuestions) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [currCategory, setCurrCategory] = useState("");
  const [currQuestion, setCurrQuestion] = useState("");

  const [pointsFirstPlayer, setPointsFirstPlayer] = useState(0);
  const [pointsSecondPlayer, setPointsSecondPlayer] = useState(0);

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isAnswerClicked, setIsAnswerClicked] = useState(false);
  const [callShowAnswer, setCallShowAnswer] = useState(false);

  const [gameFinished, setGameFinished] = useState(false);

  useEffect(() => {
    (function showAnswers() {
      if (currCategory && currQuestion) {
        const copyQuestions = { ...questions };

        let findQuestion = null;
        let notAnsweredQuestions = [];

        Object.values(copyQuestions).forEach((eachQuestion) => {
          const result = eachQuestion.filter(
            (questionInfo) => questionInfo.question._id == currQuestion._id
          );

          if (result.length > 0) {
            findQuestion = result;
          }

          const notAnsweredFromCategory = eachQuestion.filter(
            (questionInfo) => questionInfo.answered === false
          );

          notAnsweredQuestions.push(...notAnsweredFromCategory);
        });

        setTimeout(() => {
          if (notAnsweredQuestions.length == 1) {
            setGameFinished(true);
          } else {
            findQuestion[0].answered = true;
            //const questionToChange = copyQuestions.filter(())

            setQuestions(copyQuestions);
            setCurrCategory("");
            setCurrQuestion("");
            setIsAnswerCorrect(null);
            setIsAnswerClicked(false);

            setShowQuestion(false);
          }
        }, 1000);
      }
    })();
  }, [callShowAnswer]);

  return [
    showQuestion,
    setShowQuestion,
    currCategory,
    setCurrCategory,
    currQuestion,
    setCurrQuestion,
    pointsFirstPlayer,
    setPointsFirstPlayer,
    pointsSecondPlayer,
    setPointsSecondPlayer,
    isAnswerCorrect,
    setIsAnswerCorrect,
    isAnswerClicked,
    setIsAnswerClicked,
    callShowAnswer,
    setCallShowAnswer,
    gameFinished,
  ];
}
