import { useEffect } from "react";
import { useGameContext } from "../../contexts/GameContext";

export default function useQuestions(
  setShowQuestion,
  setCurrCategory,
  setCurrQuestion
) {
  const { socket } = useGameContext();

  useEffect(() => {
    socket?.on("getQuestionOpened", ({ categoryName, question }) => {
      setShowQuestion(true);
      setCurrCategory(categoryName);
      setCurrQuestion(question);
    });
  }, [socket]);
}
