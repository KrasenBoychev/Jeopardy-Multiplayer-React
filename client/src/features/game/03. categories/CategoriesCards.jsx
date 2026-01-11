import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectCategoryCount,
  selectGameCategories,
} from "./categoriesSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectActivePlayer, selectRoomId } from "../playersSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import Card from "./Card";
import PopupComp from "../../../components/popup/Popup";

export function CategoriesCards() {
  const categories = useSelector(selectCategories);
  const gameCategories = useSelector(selectGameCategories);
  const categoryCount = useSelector(selectCategoryCount);
  const user = useSelector(selectCurrentUser);
  const activePlayer = useSelector(selectActivePlayer);
  const roomId = useSelector(selectRoomId);
  const dispatch = useDispatch();

  const getGameCategoriesIDs = (selectedCategory) => {
    const categoriesIDs = [selectedCategory.id];

    gameCategories.forEach((gameCategory, index) => {
      if (index < 3) {
        categoriesIDs.push(gameCategory.id);
      }
    });

    return categoriesIDs;
  };

  const selectCategoryClickHandler = (selectedCategory) => {
    dispatch(
      setSocketReq({
        socketReqName: "send_category_selected",
        socketData: {
          roomId,
          selectedCategory,
          selectedCategoriesIDs:
            categoryCount == 3 ? getGameCategoriesIDs(selectedCategory) : null,
        },
      })
    );
  };

  const openBtnName = "CHOOSE";
  const popupHeading = "Choose Category";
  const popupContent = (
    <ul>
      {categories?.map((category) => {
        if (
          !gameCategories.find(
            (gameCategory) => gameCategory.name === category.name
          )
        ) {
          return (
            <li
              key={category.name}
              id={category.name}
              onClick={() =>
                selectCategoryClickHandler({
                  id: category._id,
                  name: category.name,
                })
              }
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
