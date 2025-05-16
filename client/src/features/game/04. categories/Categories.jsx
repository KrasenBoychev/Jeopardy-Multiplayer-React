import CategoryModel from "./children/CategoryModel";
import CategoriesHeader from "./children/CategoriesHeader";
// import QuestionsOrResult from "../05. middlewares/QuestionsOrResult";
import "./categories.css";
import "../game.css";
import { useSelector } from "react-redux";
import { selectCategories, selectGameCategories } from "./categoriesSlice";

export default function Categories() {
  const categories = useSelector(selectCategories);
  const gameCategories = useSelector(selectGameCategories);

  // const selectQuestion = async () => {
  //   if (currCategoryCount <= 3) {
  //     const updateCategories = Array.from(allCategories);
  //     const index = updateCategories.indexOf(currOption);
  //     updateCategories.splice(index, 1);
  //     setAllCategories(updateCategories);

  //     const newCategoryCount = currCategoryCount + 1;
  //     setCurrCategoryCount(newCategoryCount);
  //     setActivePlayer(friendUsername);

  //     const socketData = {
  //       categoriesNames,
  //       newCategories: updateCategories,
  //       newCategoryCount,
  //     };

  //     await socket.emit("sendCategorySelected", {
  //       receiverSocketId: friendSocketId,
  //       socketData,
  //     });

  //     if (currCategoryCount == 3) {
  //       const generateNumber = Math.random();
  //       setRandomNumber(generateNumber);
  //       setCallQuestions(true);
  //     }
  //   }
  // };

  return (
    <>
      {/* {moveToNextPage ? (
        <QuestionsOrResult
          props={{ activePlayer, setActivePlayer, questions, setQuestions }}
        />
      ) : ( */}
      <div className="categories_page_wrapper">
        <CategoriesHeader />
        <div className="categories_container">
          {gameCategories.map((gameCategory, gameCategoryIndex) => {
            return (
              <CategoryModel
                key={gameCategoryIndex}
                props={{
                  gameCategory,
                  gameCategoryIndex,
                }}
              />
            );
          })}
        </div>
      </div>
      {/* )} */}
    </>
  );
}
