import { useEffect } from "react";
import {
  updateCategoryCount,
  updateGameCategories,
} from "../../game/04. categories/categoriesSlice";
import { updateActivePlayer } from "../../game/playersSlice";
import { useDispatch } from "react-redux";
import {
  setQuestions,
  updateQuestionChosen,
} from "../../game/05. questions/questionsSlice";
import {
  deleteAnswerDetails,
  setAnswerChosen,
  updateIsAnswerCorrect,
} from "../../game/06. answers/answerSlice";

export default function useGameListeners(socket) {
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("getCategorySelected", ({ categorySelected, index }) => {
      dispatch(
        updateGameCategories({
          categoryName: categorySelected,
          index,
        })
      );
      dispatch(updateActivePlayer());
      dispatch(updateCategoryCount());
    });

    socket?.on("getQuestionsSelected", ({ questionsSelected }) => {
      dispatch(setQuestions(questionsSelected));
    });

    socket?.on("getQuestionChosen", ({ questionChosen }) => {
      dispatch(updateQuestionChosen(questionChosen));
    });

    socket?.on("getAnswerChosen", ({ answer, setIsAnswerCorrect }) => {
      dispatch(setAnswerChosen(answer));
      dispatch(updateIsAnswerCorrect(setIsAnswerCorrect));
    });
  }, [socket]);
}
