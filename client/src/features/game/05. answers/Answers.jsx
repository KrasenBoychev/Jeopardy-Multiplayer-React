import { useSelector } from "react-redux";
import { selectQuestionChosen } from "../04. questions/questionsSlice";
import AnswersHeader from "./AnswersHeader";
import AnswersBody from "./AnswersBody";
import "../game.css";
import "./answers.css";

export default function Answers() {
  const question = useSelector(selectQuestionChosen);

  return (
    <section className="show_question_container">
      <AnswersHeader />
      <div className="show_question_wrapper">
        <h1>{question.name}</h1>
        <div className="answers_wrapper">
          {Object.values(question.answers).map((answer, index) => {
            return <AnswersBody key={answer + index} answer={answer} />;
          })}
        </div>
      </div>
    </section>
  );
}
