import { useSelector } from "react-redux";
import { selectQuestions } from "./questionsSlice";
import { selectActivePlayer } from "../playersSlice";
import { selectGameCategories } from "../04. categories/categoriesSlice";
import QuestionModel from "./children/QuestionModel";
import QuestionsHeader from "./children/QuestionsHeader";
import "./questions.css";

export default function Questions() {
  const questions = useSelector(selectQuestions);
  const gameCategories = useSelector(selectGameCategories);
  const activePlayer = useSelector(selectActivePlayer);

  return (
    <section>
      <QuestionsHeader activePlayer={activePlayer.username} />

      <div className="categories_names">
        {gameCategories.map((categoryName) => {
          return (
            <div key={categoryName} className="category_box">
              {categoryName}
            </div>
          );
        })}
      </div>

      <div className="questions_container">
        {questions.map((question) => {
          return (
            <div key={question._id}>
              <QuestionModel question={question} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
