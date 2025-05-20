import CategoryModel from "./children/CategoryModel";
import CategoriesHeader from "./children/CategoriesHeader";
// import QuestionsOrResult from "../05. middlewares/QuestionsOrResult";
import "./categories.css";
import "../game.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  selectCategories,
  selectCategoryCount,
  selectGameCategories,
} from "./categoriesSlice";
import { selectActivePlayer, selectRivalPlayer } from "../playersSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import { useGetQuestionsMutation } from "../gameApiSlice";
import { selectQuestions, setQuestions } from "../06. questions/questionsSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";

export default function Categories() {
  const categories = useSelector(selectCategories);
  const gameCategories = useSelector(selectGameCategories);
  const categoriesCount = useSelector(selectCategoryCount);
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectCurrentUser);
  const rivalPlayer = useSelector(selectRivalPlayer);
  const questions = useSelector(selectQuestions);
  const [getQuestions] = useGetQuestionsMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (categoriesCount == 4 && user.username == activePlayer.username) {
        const categoriesIDs = [];

        console.log({ categories });

        console.log({ gameCategories });

        gameCategories.forEach((gameCategoryName) => {
          const findCategory = categories.find(
            (category) => category.name == gameCategoryName
          );

          console.log({ findCategory });

          categoriesIDs.push(findCategory._id);
        });

        const selectedQuestions = await getQuestions(categoriesIDs);
        
        dispatch(setQuestions(selectedQuestions.data));
        dispatch(
          setSocketReq({
            socketReqName: "sendQuestionsSelected",
            socketData: {
              receiverSocketId: rivalPlayer.socketId,
              questionsSelected: selectedQuestions.data,
            },
          })
        );
      }
    })();
  }, [categoriesCount]);

  return (
    <>
      {questions ? (
        <div>Yeeee</div>
      ) : (
        // <QuestionsOrResult />
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
      )}
    </>
  );
}
