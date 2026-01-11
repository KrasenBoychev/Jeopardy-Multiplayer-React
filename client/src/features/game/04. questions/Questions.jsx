import { useSelector } from "react-redux";
import { selectQuestions } from "./questionsSlice";
import { selectGameCategories } from "../03. categories/categoriesSlice";
import QuestionsBody from "./QuestionsBody";
import QuestionsHeader from "./QuestionsHeader";
import "../game.css";

export default function Questions() {
  const questions = useSelector(selectQuestions);
  const gameCategories = useSelector(selectGameCategories);

  return (
    <section>
      <QuestionsHeader />

      <div className="categories_names">
        {gameCategories.map((category) => {
          return (
            <div key={category.name} className="category_box">
              {category.name}
            </div>
          );
        })}
      </div>

      <div className="questions_container">
        {questions.map((question) => {
          return (
            <div key={question._id}>
              <QuestionsBody question={question} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
