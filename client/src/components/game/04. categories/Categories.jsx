import { useState } from "react";
import useCategories from "../../../hooks/useCategories";
import ChooseQuestion from "../05. choose_question/ChooseQuestion";
import CategoryModel from "./CategoryModel";

import "./categories.css";
import "../game.css";
import { useAuthContext } from "../../../contexts/AuthContext";

export default function Categories({ props }) {
  const { firstPlayer, secondPlayer } = props.players;
  const { username } = useAuthContext();

  const [activePlayer, setActivePlayer] = useState(firstPlayer.username);
  const [currOption, setCurrOption] = useState("");

  const [
    currCategoryCount,
    setCurrCategoryCount,
    moveToNextPage,
    allCategories,
    setAllCategories,
    categoriesInfo,
    defaultOption,
    questions,
    setQuestions,
    setRandomNumber,
  ] = useCategories();

  const chosenOption = async (e) => {
    categoriesInfo[currCategoryCount].setCategory(e.target.value);
    setCurrOption(e.target.value);
  };

  const selectQuestion = async () => {
    if (currCategoryCount <= 3) {
      const updateCategories = Array.from(allCategories);
      const index = updateCategories.indexOf(currOption);
      updateCategories.splice(index, 1);
      setAllCategories(updateCategories);

      setCurrCategoryCount(currCategoryCount + 1);

      activePlayer == username
        ? setActivePlayer(secondPlayer)
        : setActivePlayer(firstPlayer);

      if (currCategoryCount == 3) {
        const generatenNumber = Math.random();
        setRandomNumber(generatenNumber);
      }

      //TO DO: await socket....
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
            {Object.entries(categoriesInfo).map((categoryInfo) => {
              return (
                <CategoryModel
                  key={categoryInfo[0]}
                  props={{
                    categoryInfo,
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
