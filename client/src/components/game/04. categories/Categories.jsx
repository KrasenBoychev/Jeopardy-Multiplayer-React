import { useState } from "react";
import { useGameContext } from "../../../contexts/GameContext";
import useCategories from "../../../hooks/useCategories";
import Questions from "../05. questions/Questions";
import CategoryModel from "./children/CategoryModel";
import CategoriesHeader from "./children/CategoriesHeader";
import "./categories.css";
import "../game.css";

export default function Categories() {
  const { socket, friendSocketId, friendUsername } = useGameContext();
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
    setCallQuestions,
  ] = useCategories();

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
      setActivePlayer(friendUsername);

      const socketData = {
        categoriesNames,
        newCategories: updateCategories,
        newCategoryCount,
      };

      await socket.emit("sendCategorySelected", {
        receiverSocketId: friendSocketId,
        socketData,
      });

      if (currCategoryCount == 3) {
        const generateNumber = Math.random();
        setRandomNumber(generateNumber);
        setCallQuestions(true);
      }
    }
  };

  return (
    <>
      {moveToNextPage ? (
        <Questions
          props={{
            activePlayer,
            setActivePlayer,
            questions,
            setQuestions,
          }}
        />
      ) : (
        <div className="categories_page_wrapper">
          <CategoriesHeader props={{ activePlayer, currCategoryCount }} />
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
