import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { recordPoints } from "../../api/game-api";

import { useAuthContext } from "../contexts/AuthContext";

export default function useChooseQuestion(
  questions,
  setQuestions,
  firstPlayer
) {
  const authData = useAuthContext();

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

        setTimeout(async () => {
          if (notAnsweredQuestions.length == 1) {
            setGameFinished(true);

            try {
              if (authData.username == firstPlayer) {
                await recordPoints(authData.userId, pointsFirstPlayer);

                authData.points += pointsFirstPlayer;
                authData.changeAuthState(authData);

              } else {
                await recordPoints(authData.userId, pointsSecondPlayer);

                authData.points += pointsSecondPlayer;
                authData.changeAuthState(authData);
              }
            } catch (error) {
              toast.error(
                "Points could not be added to your account. Please contact our Customer Service Team."
              );
              return;
            }
          } else {
            findQuestion[0].answered = true;

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
