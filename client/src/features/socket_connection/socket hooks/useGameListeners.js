import { useEffect } from "react";
import {
  deleteCategories,
  setCategories,
  updateCategoryCount,
  updateGameCategories,
} from "../../game/03. categories/categoriesSlice";
import {
  deletePlayersDetails,
  setPlayersAndRoom,
  updateActivePlayer,
  updatePlayerPoints,
} from "../../game/playersSlice";
import { useDispatch } from "react-redux";
import {
  deleteQuestions,
  setQuestions,
  updateQuestionAnswered,
  updateQuestionChosen,
} from "../../game/04. questions/questionsSlice";
import {
  deleteAnswerDetails,
  setAnswerChosen,
  updateIsAnswerCorrect,
} from "../../game/05. answers/answerSlice";
import {
  deleteGameDetails,
  updateIsGameCompleted,
  updateIsNewGameStarted,
} from "../../game/gameSlice";
import toast from "react-hot-toast";

export default function useGameListeners(socket) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;

    const handleGameStarted = ({ roomId, players }) => {
      dispatch(setPlayersAndRoom({ roomId, players }));
      dispatch(updateIsNewGameStarted());
    };

    const handleGameErrorMessage = (message) => {
      toast.error(message);

      setTimeout(() => {
        dispatch(deleteGameDetails());
        dispatch(deletePlayersDetails());
        dispatch(deleteCategories());
        dispatch(deleteQuestions());
      }, 2000);
    };

    const handleOpponentLeft = () => {
      toast.error("Your opponent has left the game.");
    };

    const handleOpponentDisconnected = () => {
      toast.error("Your opponent has disconnected from the game.");
    };

    const handleSetGameCategories = ({ allCategories }) => {
      dispatch(setCategories(allCategories));
    };

    const handleGetCategorySelected = ({ selectedCategory }) => {
      dispatch(updateGameCategories(selectedCategory));
      dispatch(updateActivePlayer());
      dispatch(updateCategoryCount());
    };

    const handleGetQuestionsSelected = ({ transformQuestions }) => {
      dispatch(setQuestions(transformQuestions));
    };

    const handleGetQuestionChosen = ({ question }) => {
      dispatch(updateQuestionChosen(question));
    };

    const handleGetAnswerChosen = ({
      answer,
      setIsAnswerCorrect,
      playerToUpdate,
      pointsToAdd,
      questionChosen,
    }) => {
      if (setIsAnswerCorrect) {
        dispatch(
          updatePlayerPoints({
            player: playerToUpdate,
            pointsToAdd,
          })
        );
      }

      dispatch(setAnswerChosen(answer));
      dispatch(updateIsAnswerCorrect(setIsAnswerCorrect));

      setTimeout(() => {
        dispatch(updateQuestionChosen(null));
        dispatch(deleteAnswerDetails());
        dispatch(updateQuestionAnswered(questionChosen));
        dispatch(updateActivePlayer());
      }, 1000);
    };

    const handleGetGameResult = () => {
      dispatch(updateIsGameCompleted());
    };

    socket.on("game_started", handleGameStarted);
    socket.on("game_error_message", handleGameErrorMessage);
    socket.on("opponent_left", handleOpponentLeft);
    socket.on("opponent_disconnected", handleOpponentDisconnected);
    socket.on("get_categories", handleSetGameCategories);
    socket.on("get_category_selected", handleGetCategorySelected);
    socket.on("get_questions_selected", handleGetQuestionsSelected);
    socket.on("get_question_chosen", handleGetQuestionChosen);
    socket.on("get_answer_chosen", handleGetAnswerChosen);
    socket.on("get_game_result", handleGetGameResult);

    return () => {
      socket.off("game_started", handleGameStarted);
      socket.off("opponent_disconnected", handleOpponentDisconnected);
      socket.off("game_error_message", handleGameErrorMessage);
      socket.off("get_categories", handleSetGameCategories);
      socket.off("get_category_selected", handleGetCategorySelected);
      socket.off("get_questions_selected", handleGetQuestionsSelected);
      socket.off("get_question_chosen", handleGetQuestionChosen);
      socket.off("get_answer_chosen", handleGetAnswerChosen);
      socket.off("get_game_result", handleGetGameResult);
    };
  }, [socket]);
}
