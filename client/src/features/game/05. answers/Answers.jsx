import { useSelector } from "react-redux";
import { selectQuestionChosen } from "../04. questions/questionsSlice";
import AnswersHeader from "./AnswersHeader";
import AnswersBody from "./AnswersBody";

export default function Answers() {
  const question = useSelector(selectQuestionChosen);

  return (
    <section className="flex flex-col gap-10 justify-center rounded-md">
      <AnswersHeader />
      <div className="max-w-[800px] flex flex-col gap-2 bg-[#73737399] p-3 rounded-md max-[1800px]:max-w-[750px] max-[1600px]:max-w-[700px] max-[1400px]:max-w-[650px]">
        <h1 className="text-[35px] text-black bg-white rounded-md p-4 max-[1800px]:text-[32px] max-[1600px]:text-[29px] max-[1400px]:text-[26px]">
          {question.name}
        </h1>
        <div className="flex flex-col gap-2 p-2">
          {Object.values(question.answers).map((answer, index) => {
            return <AnswersBody key={answer + index} answer={answer} />;
          })}
        </div>
      </div>
    </section>
  );
}
