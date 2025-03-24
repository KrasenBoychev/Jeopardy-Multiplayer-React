import { useState } from "react";
import useCategories from "../../../hooks/useCategories";
import ChooseQuestion from "../05. choose_question/ChooseQuestion";
import CategoryModel from "./CategoryModel";

import "./categories.css";
import "../game.css";
import { useAuthContext } from "../../../contexts/AuthContext";
import {
  getFriendSocketId,
  setNewActivePlayer,
} from "../../../utils/gameUtils";

export default function Categories({ props }) {
  const { socket, firstPlayer, secondPlayer } = props;
  const { username } = useAuthContext();

  const [currOption, setCurrOption] = useState("");

  const [
    activePlayer,
    setActivePlayer,
    currCategoryCount,
    setCurrCategoryCount,
    moveToNextPage,
    allCategories,
    setAllCategories,
    defaultOption,
    questions,
    setQuestions,
    setRandomNumber,
    categoriesNames,
    setCategoriesNames,
  ] = useCategories(socket, firstPlayer);

  const chosenOption = async (e) => {
    const newArray = categoriesNames;
    newArray.splice(currCategoryCount, 1, e.target.value);
    setCategoriesNames(newArray);
    setCurrOption(e.target.value);
  };

  const selectQuestion = async () => {
    if (currCategoryCount <= 3) {
      const updateCategories = Array.from(allCategories);
      const index = updateCategories.indexOf(currOption);
      updateCategories.splice(index, 1);
      setAllCategories(updateCategories);

      const newCategoryCount = currCategoryCount + 1;
      setCurrCategoryCount(newCategoryCount);

      const newActivePlayer = setNewActivePlayer(
        activePlayer,
        setActivePlayer,
        firstPlayer,
        secondPlayer
      );

      const socketData = {
        categoriesNames,
        newCategories: updateCategories,
        newCategoryCount,
        newActivePlayer,
      };

      if (currCategoryCount == 3) {
        const generatenNumber = Math.random();
        setRandomNumber(generatenNumber);
        socketData.generatenNumber = generatenNumber;
      }

      const friendSocketId = getFriendSocketId(
        activePlayer,
        firstPlayer,
        secondPlayer
      );

      await socket.emit("sendCategorySelected", {
        receiverSocketId: friendSocketId,
        socketData,
      });
    }
  };

  return (
    <>
      {moveToNextPage ? (
        <ChooseQuestion
          props={{
            activePlayer,
            setActivePlayer,
            firstPlayer,
            secondPlayer,
            questions,
            setQuestions,
          }}
        />
      ) : (
        <div className="categories_page_wrapper">
          <p
            className={
              username == activePlayer && currCategoryCount < 4
                ? "active_player player_categories"
                : "player_categories"
            }
          >
            {currCategoryCount < 4
              ? `${activePlayer} chooses category`
              : "Loading Questions..."}
          </p>
          <div className="categories_container">
            {categoriesNames.map((categoryName, categoryIndex) => {
              return (
                <CategoryModel
                  key={categoryIndex}
                  props={{
                    categoryName,
                    categoryIndex,
                    currCategoryCount,
                    allCategories,
                    chosenOption,
                    selectQuestion,
                    activePlayer,
                    defaultOption,
                  }}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
