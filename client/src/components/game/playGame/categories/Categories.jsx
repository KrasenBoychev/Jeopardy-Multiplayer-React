import { useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";

import useCategories from "../../../../hooks/useCategories";

import "./categories.css";

import ChooseQuestion from "../chooseQuestion/ChooseQuestion";
import CategoryModel from "./CategoryModel";

export default function Categories({ props }) {
  const { firstPlayer, secondPlayer } = props.players;
  const { channel } = useChannelStateContext();
  const { client } = useChatContext();

  const [activePlayer, setActivePlayer] = useState(firstPlayer);
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
    await channel.sendEvent({
      type: "choose-option",
      data: { option: e.target.value, currCategoryCount, activePlayer },
    });
  };

  const selectQuestion = async () => {
    const generatenNumber = Math.random();

    await channel.sendEvent({
      type: "select-category",
      data: { activePlayer, currCategoryCount, allCategories, currOption, generatenNumber },
    });
  };

  channel.on((event) => {
    if (
      event.type == "select-category" &&
      event.user.name === event.data.activePlayer
    ) {
      if (event.data.currCategoryCount <= 3) {
        const updateCategories = Array.from(event.data.allCategories);
        const index = updateCategories.indexOf(event.data.currOption);
        updateCategories.splice(index, 1);
        setAllCategories(updateCategories);

        setCurrCategoryCount(event.data.currCategoryCount + 1);

        event.data.activePlayer == firstPlayer
          ? setActivePlayer(secondPlayer)
          : setActivePlayer(firstPlayer);

          if (event.data.currCategoryCount == 3) {
            setRandomNumber(event.data.generatenNumber);
          }
      }
    }

    if (
      event.type == "choose-option" &&
      event.user.name === event.data.activePlayer
    ) {
      categoriesInfo[event.data.currCategoryCount].setCategory(
        event.data.option
      );

      setCurrOption(event.data.option);
    }
  });

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
        <div className="gameContainer">
          <p
            className={
              client.user.name === activePlayer && currCategoryCount < 4
                ? "activeCat player-categories"
                : "inactiveCat player-categories"
            }
          >
            {currCategoryCount < 4
              ? `${activePlayer} chooses category`
              : "Loading Questions..."}
          </p>
          <div className="categories-container">
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
                    client,
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
