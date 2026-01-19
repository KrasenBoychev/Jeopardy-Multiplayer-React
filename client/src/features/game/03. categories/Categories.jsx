import { useSelector } from "react-redux";
import { selectQuestions } from "../04. questions/questionsSlice";
import QuestionsMiddleware from "../04. questions/QuestionsMiddleware";
import ExitGame from "../exitGame/ExitGame";
import CategoriesHeader from "./CategoriesHeader";
import { CategoriesCards } from "./CategoriesCards";

export default function Categories() {
  const questions = useSelector(selectQuestions);

  return (
    <>
      <ExitGame />
      <div className="absolute z-50 inset-0 flex items-center justify-center text-white px-4 text-3xl text-center md:text-4xl lg:text-7xl">
        {questions ? (
          <QuestionsMiddleware />
        ) : (
          <div className="flex flex-col items-center gap-12">
            <CategoriesHeader />
            <div className="w-[1000px]">
              <CategoriesCards />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
