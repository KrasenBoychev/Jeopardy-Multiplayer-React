import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useGetQuestionsMutation } from "../gameApiSlice";
import {
  selectCategories,
  selectCategoryCount,
  selectGameCategories,
} from "./categoriesSlice";
import { selectActivePlayer, selectRivalPlayer } from "../playersSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectQuestions, setQuestions } from "../05. questions/questionsSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import CategoriesHeader from "./children/CategoriesHeader";
import CategoryModel from "./children/CategoryModel";
import QuestionsMiddleware from "../05. questions/QuestionsMiddleware";
import "./categories.css";
import "../game.css";
import ExitGame from "../exitGame/ExitGame";

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

        gameCategories.forEach((gameCategoryName) => {
          const findCategory = categories.find(
            (category) => category.name == gameCategoryName
          );

          categoriesIDs.push(findCategory._id);
        });

        const selectedQuestions = await getQuestions(categoriesIDs);
        const transfromQuestions = selectedQuestions.data.map((question) => ({
          ...question,
          answered: false,
        }));

        dispatch(setQuestions(transfromQuestions));
        dispatch(
          setSocketReq({
            socketReqName: "sendQuestionsSelected",
            socketData: {
              receiverSocketId: rivalPlayer.socketId,
              questionsSelected: transfromQuestions,
            },
          })
        );
      }
    })();
  }, [categoriesCount]);

  return (
    <>
      {questions ? (
        <QuestionsMiddleware />
      ) : (
        <div className="categories_page_wrapper">
          <ExitGame />
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
