import useQuestions from "../../../hooks/game_hooks/useQuestions";
import QuestionModel from "./children/QuestionModel";
import QuestionsHeader from "./children/QuestionsHeader";
import "./questions.css";

export default function Questions({ props }) {
  const {
    activePlayer,
    questions,
    setShowQuestion,
    setCurrCategory,
    setCurrQuestion,
  } = props;

  useQuestions(setShowQuestion, setCurrCategory, setCurrQuestion);

  return (
    <section>
      <QuestionsHeader activePlayer={activePlayer} />

      <div className="categories_names">
        {Object.keys(questions).map((categoryName) => {
          return (
            <div key={categoryName} className="category_box">
              {categoryName}
            </div>
          );
        })}
      </div>

      <div className="questions_container">
        {Object.entries(questions).map((item, indexItem) => {
          return (
            <div key={item[0] + indexItem}>
              {Object.values(questions).map((question, indexQuestion) => {
                return (
                  <QuestionModel
                    key={question[indexItem].question._id}
                    props={{
                      activePlayer,
                      categoryName: Object.keys(questions)[indexQuestion],
                      question: question[indexItem].question,
                      questionAnswered: question[indexItem].answered,
                      setShowQuestion,
                      setCurrCategory,
                      setCurrQuestion,
                    }}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
