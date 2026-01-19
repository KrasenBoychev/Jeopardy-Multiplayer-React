import { useSelector } from "react-redux";
import { selectQuestions } from "./questionsSlice";
import { selectGameCategories } from "../03. categories/categoriesSlice";
import QuestionsBody from "./QuestionsBody";
import QuestionsHeader from "./QuestionsHeader";
import { points } from "../gamePoints";
import InfiniteMarquee from "../../../components/InfiniteMarquee";

export default function Questions() {
  const questions = useSelector(selectQuestions);
  const gameCategories = useSelector(selectGameCategories);

  return (
    <section className="flex flex-col gap-3 justify-center">
      <QuestionsHeader />

      <div className="mt-5 flex text-[15px] rounded-md overflow-hidden max-[1800px]:text-[14px] max-[1600px]:text-[13px] max-[1400px]:text-[12px]">
        {gameCategories.map((category, index) => {
          return (
            <div
              key={category.id}
              className={`flex flex-col gap-10 p-5 max-[1800px]:gap-9 max-[1600px]:gap-8 max-[1400px]:gap-7 ${
                index == 0
                  ? "bg-[#1E3A8A99]"
                  : index == 1
                    ? "bg-[#10B98199]"
                    : index == 2
                      ? "bg-[#F59E0B99]"
                      : "bg-[#7C3AED99]"
              }`}
            >
              <div className="w-[200px] flex uppercase font-bold justify-center bg-[#00000099] py-2 rounded-sm truncate max-[1800px]:w-[175px] max-[1600px]:w-[150px] max-[1400px]:w-[125px]">
                <InfiniteMarquee>
                  <p className="px-2">{category.name}</p>
                </InfiniteMarquee>
              </div>
              <div className="flex flex-col gap-10 max-[1800px]:gap-9 max-[1600px]:gap-8 max-[1400px]:gap-7">
                {points.map((questionPoints, index) => {
                  return (
                    <QuestionsBody
                      key={index}
                      question={questions.find(
                        (findQuestion) =>
                          findQuestion.categoryId == category.id &&
                          findQuestion.points == questionPoints,
                      )}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
