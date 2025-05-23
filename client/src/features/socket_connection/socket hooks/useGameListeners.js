import { useEffect } from "react";
import {
  updateCategoryCount,
  updateGameCategories,
} from "../../game/04. categories/categoriesSlice";
import { updateActivePlayer } from "../../game/playersSlice";
import { useDispatch } from "react-redux";
import { setQuestions } from "../../game/05. questions/questionsSlice";

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

  }, [socket]);
}
