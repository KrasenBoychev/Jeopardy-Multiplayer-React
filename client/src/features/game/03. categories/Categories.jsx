import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useGetQuestionsMutation } from "../gameApiSlice";
import {
  selectCategories,
  selectCategoryCount,
  selectGameCategories,
} from "./categoriesSlice";
import { selectActivePlayer, selectRivalPlayer } from "../playersSlice";
import { selectCurrentUser } from "../../authentication/authSlice";
import { selectQuestions, setQuestions } from "../04. questions/questionsSlice";
import { setSocketReq } from "../../socket_connection/socketSlice";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import QuestionsMiddleware from "../04. questions/QuestionsMiddleware";
import ExitGame from "../exitGame/ExitGame";
import CategoriesHeader from "./CategoriesHeader";
import { CategoriesCards } from "./CategoriesCards";
import "../game.css";

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

        try {
          const selectedQuestions = await getQuestions(categoriesIDs);
          const transformQuestions = selectedQuestions.data.map((question) => ({
            ...question,
            answered: false,
          }));

          dispatch(setQuestions(transformQuestions));
          dispatch(
            setSocketReq({
              socketReqName: "sendQuestionsSelected",
              socketData: {
                receiverSocketId: rivalPlayer[0],
                questionsSelected: transformQuestions,
              },
            })
          );
        } catch (err) {
          toast.error(
            "Connecting to the server failed! Please refresh the page."
          );
          console.log(err.message);
        }
      }
    })();
  }, [categoriesCount]);

  return (
    <BackgroundGradientAnimation>
      <>
        <ExitGame />
        <div className="absolute z-50 inset-0 flex items-center justify-center text-white px-4 text-3xl text-center md:text-4xl lg:text-7xl">
          {questions ? (
            <QuestionsMiddleware />
          ) : (
            <div className="categories_page_wrapper">
              <CategoriesHeader />
              <div className="categories_container">
                <CategoriesCards />
              </div>
            </div>
          )}
        </div>
      </>
    </BackgroundGradientAnimation>
  );
}
