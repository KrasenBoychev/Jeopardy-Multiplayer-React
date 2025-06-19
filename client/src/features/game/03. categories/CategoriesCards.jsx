import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoryCount,
  selectGameCategories,
  updateCategoryCount,
  updateGameCategories,
} from "./categoriesSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import {
  selectActivePlayer,
  selectRivalPlayer,
  updateActivePlayer,
} from "../playersSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { Card } from "@/components/ui/focus-cards";
import PopupComp from "../../../components/popup/Popup";

export function CategoriesCards() {
  const categories = useSelector(selectCategories);
  const gameCategories = useSelector(selectGameCategories);
  const categoryCount = useSelector(selectCategoryCount);
  const user = useSelector(selectCurrentUser);
  const activePlayer = useSelector(selectActivePlayer);
  const rivalPlayer = useSelector(selectRivalPlayer);
  const dispatch = useDispatch();

  const selectCategoryClickHandler = (e) => {
    const selectedCategory = e.target.id;

    dispatch(
      updateGameCategories({
        categoryName: selectedCategory,
        index: categoryCount,
      })
    );

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

  const openBtnName = "CHOOSE";
  const popupHeading = "Choose Category";
  const popupContent = (
    <ul>
      {categories?.map((category) => {
        if (!gameCategories.includes(category.name)) {
          return (
            <li
              key={category.name}
              id={category.name}
              onClick={selectCategoryClickHandler}
            >
              {category.name}
            </li>
          );
        }
      })}
    </ul>
  );

  const PopUp = (
    <PopupComp
      openBtnName={openBtnName}
      heading={popupHeading}
      content={popupContent}
    />
  );

  return (
    <div className="flex gap-10 mx-auto w-full">
      {gameCategories.map((gameCategory, index) => (
        <Card
          key={index}
          index={index}
          gameCategory={gameCategory}
          categoryCount={categoryCount}
          user={user}
          activePlayer={activePlayer}
          PopUp={PopUp}
        />
      ))}
    </div>
  );
}
