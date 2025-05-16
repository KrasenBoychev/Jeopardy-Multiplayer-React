import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../authentication/authSlice";
import {
  selectActivePlayer,
  selectRivalPlayer,
  updateActivePlayer,
} from "../../playersSlice";
import {
  defaultOption,
  selectCategories,
  selectCategoryCount,
  selectGameCategories,
  updateCategories,
  updateCategoryCount,
  updateGameCategories,
} from "../categoriesSlice";
import { setSocketReq } from "../../../socket_connection/socketSlice";
import { useState } from "react";
import toast from "react-hot-toast";

export default function CategoryModel({ props }) {
  const { gameCategory, gameCategoryIndex } = props;
  const [selectedCategory, setSelectedCategory] = useState(defaultOption);
  const user = useSelector(selectCurrentUser);
  const activePlayer = useSelector(selectActivePlayer);
  const rivalPlayer = useSelector(selectRivalPlayer);
  const categories = useSelector(selectCategories);
  const categoryCount = useSelector(selectCategoryCount);
  const dispatch = useDispatch();
  const gameCategories = useSelector(selectGameCategories);

  const chosenOption = (e) => {
    setSelectedCategory(e.target.value);
  };

  const selectCategoryClickHandler = () => {
    dispatch(
      updateGameCategories({
        categoryName: selectedCategory,
        index: categoryCount,
      })
    );
    dispatch(updateCategories(selectedCategory));

    dispatch(
      setSocketReq({
        socketReqName: "sendCategorySelected",
        socketData: {
          receiverSocketId: rivalPlayer.socketId,
          categorySelected: selectedCategory,
          index: categoryCount,
        },
      })
    );

    dispatch(updateActivePlayer());
    dispatch(updateCategoryCount());
  };

  return (
    <div
      className={
        categoryCount > gameCategoryIndex
          ? "chosen_category category_model"
          : categoryCount == gameCategoryIndex
          ? "category_model"
          : "inactiveCat category_model"
      }
    >
      {categoryCount == gameCategoryIndex ? (
        <>
          <select
            name="category"
            id="category"
            disabled={user.username === activePlayer.username ? false : true}
            onChange={chosenOption}
          >
            <option key={defaultOption} value={defaultOption}>
              {defaultOption}
            </option>
            {categories.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            disabled={
              user.username === activePlayer.username &&
              selectedCategory !== defaultOption
                ? false
                : true
            }
            onClick={selectCategoryClickHandler}
          >
            Ready
          </button>
        </>
      ) : (
        <p>{gameCategory}</p>
      )}
    </div>
  );
}
