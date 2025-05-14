import { useEffect } from "react";
import {
  updateCategories,
  updateCategoryCount,
  updateGameCategories,
} from "../../game/04. categories/categoriesSlice";
import { updateActivePlayer } from "../../game/gameSlice";
import { useDispatch } from "react-redux";

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
      dispatch(updateCategories(categorySelected));
      dispatch(updateActivePlayer());
      dispatch(updateCategoryCount());
    });
  }, [socket]);
}
