import { useEffect } from "react";
import {
  updateCategoryCount,
  updateGameCategories,
} from "../../game/03. categories/categoriesSlice";
import { updateActivePlayer } from "../../game/playersSlice";
import { useDispatch } from "react-redux";
import {
  setQuestions,
  updateQuestionChosen,
} from "../../game/04. questions/questionsSlice";
import {
  setAnswerChosen,
  updateIsAnswerCorrect,
} from "../../game/05. answers/answerSlice";
import { setPlayers } from "../../game/gameSlice";

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

    socket.on("getCategorySelected", handleGetCategorySelected);
    socket.on("getQuestionsSelected", handleGetQuestionsSelected);
    socket.on("getQuestionChosen", handleGetQuestionChosen);
    socket.on("getAnswerChosen", handleGetAnswerChosen);
    socket.on("game_started", (data) => {
      console.log(`Joined room: ${data.roomId}`);
      // Navigate to /game/:roomId
    });

    socket.on("user_list_update", (updatedPlayers) => {
      dispatch(setPlayers(updatedPlayers)); // Users will now have a 'status' property
    });

    return () => {
      socket.off("getCategorySelected", handleGetCategorySelected);
      socket.off("getQuestionsSelected", handleGetQuestionsSelected);
      socket.off("getQuestionChosen", handleGetQuestionChosen);
      socket.off("getAnswerChosen", handleGetAnswerChosen);
    };
  }, [socket]);
}
