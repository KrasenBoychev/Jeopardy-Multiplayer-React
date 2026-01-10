import { useEffect } from "react";
import {
  setCategories,
  updateCategoryCount,
  updateGameCategories,
} from "../../game/03. categories/categoriesSlice";
import { setPlayersAndRoom, updateActivePlayer } from "../../game/playersSlice";
import { useDispatch } from "react-redux";
import {
  setQuestions,
  updateQuestionChosen,
} from "../../game/04. questions/questionsSlice";
import {
  setAnswerChosen,
  updateIsAnswerCorrect,
} from "../../game/05. answers/answerSlice";
import {
  updateIsNewGameStarted,
  updateReadyToPlay,
} from "../../game/gameSlice";
import toast from "react-hot-toast";

export default function useGameListeners(socket) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleGetCategorySelected = ({ categorySelected, index }) => {
      dispatch(
        updateGameCategories({
          categoryName: categorySelected,
          index,
        })
      );
      dispatch(updateActivePlayer());
      dispatch(updateCategoryCount());
    };

    const handleGetQuestionsSelected = ({ questionsSelected }) => {
      dispatch(setQuestions(questionsSelected));
    };

    const handleGetQuestionChosen = ({ questionChosen }) => {
      dispatch(updateQuestionChosen(questionChosen));
    };

    const handleGetAnswerChosen = ({ answer, setIsAnswerCorrect }) => {
      dispatch(setAnswerChosen(answer));
      dispatch(updateIsAnswerCorrect(setIsAnswerCorrect));
    };

    const handleGameStarted = ({ roomId, players }) => {
      dispatch(setPlayersAndRoom({ ...players, roomId }));
      dispatch(updateIsNewGameStarted());
    };

    const handleOpponentLeft = () => {
      toast.error("Your opponent has left the game.");
    };

    const handleOpponentDisconnected = () => {
      toast.error("Your opponent has disconnected from the game.");
      console.log("Opponent disconnected");
    };

    const handleSetGameCategories = ({ allCategories }) => {
      dispatch(setCategories(allCategories));
      dispatch(updateReadyToPlay());
    };

    socket.on("game_started", handleGameStarted);
    socket.on("opponent_left", handleOpponentLeft);
    socket.on("opponent_disconnected", handleOpponentDisconnected);
    socket.on("get_categories", handleSetGameCategories);
    socket.on("getCategorySelected", handleGetCategorySelected);
    socket.on("getQuestionsSelected", handleGetQuestionsSelected);
    socket.on("getQuestionChosen", handleGetQuestionChosen);
    socket.on("getAnswerChosen", handleGetAnswerChosen);

    return () => {
      socket.off("game_started", handleGameStarted);
      socket.off("opponent_disconnected", handleOpponentDisconnected);
      socket.off("get_categories", handleSetGameCategories);
      socket.off("getCategorySelected", handleGetCategorySelected);
      socket.off("getQuestionsSelected", handleGetQuestionsSelected);
      socket.off("getQuestionChosen", handleGetQuestionChosen);
      socket.off("getAnswerChosen", handleGetAnswerChosen);
    };
  }, [socket]);
}
