import { useEffect, useState } from "react";

export default function useSetQAndAValues(
  questions,
  setQuestions,
  setGameFinished
) {
  const [showQuestion, setShowQuestion] = useState(false);
  const [currCategory, setCurrCategory] = useState("");
  const [currQuestion, setCurrQuestion] = useState("");

  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [isAnswerClicked, setIsAnswerClicked] = useState(false);
  const [recordAnswer, setRecordAnswer] = useState(false);

  useEffect(() => {
    (function recordAnswer() {
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

          const notAnsweredQuestionsFromCategory = eachQuestion.filter(
            (questionInfo) => questionInfo.answered === false
          );

          notAnsweredQuestions.push(...notAnsweredQuestionsFromCategory);
        });

        setTimeout(async () => {
          if (notAnsweredQuestions.length == 1) {
            setGameFinished(true);
          } else {
            findQuestion[0].answered = true;

            setQuestions(copyQuestions);
            setCurrCategory("");
            setCurrQuestion("");
            setIsAnswerCorrect(null);
            setIsAnswerClicked(false);
            setShowQuestion(false);
            setRecordAnswer(false);
          }
        }, 3000);
      }
    })();
  }, [recordAnswer]);

  return [
    showQuestion,
    currCategory,
    currQuestion,
    isAnswerClicked,
    isAnswerCorrect,
    setShowQuestion,
    setCurrCategory,
    setCurrQuestion,
    setIsAnswerClicked,
    setIsAnswerCorrect,
    setRecordAnswer,
  ];
}
