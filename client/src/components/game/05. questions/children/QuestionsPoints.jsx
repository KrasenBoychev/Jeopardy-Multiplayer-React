import Score from "../../score/Score";
import Timer from "../../timer/Timer";
import QuestionModel from "./QuestionModel";
import QuestionsHeader from "./QuestionsHeader";

export default function QuestionsPoints({ props }) {
  const {
    activePlayer,
    pointsFirstPlayer,
    pointsSecondPlayer,
    questions,
    setShowQuestion,
    setCurrCategory,
    setCurrQuestion,
  } = props;

  return (
    <div className="questions_page_wrapper">
      <Score points={{ pointsFirstPlayer, pointsSecondPlayer }} />
      <section>
        <QuestionsHeader activePlayer={activePlayer} />
        <div className="categories_names">
          {Object.keys(questions).map((categoryName) => {
            return (
              <QuestionModel key={categoryName} props={{ categoryName }} />
            );
          })}
        </div>

        <div className="questions_container">
          {Object.entries(questions).map((item, indexItem) => {
            return (
              <div key={indexItem}>
                {Object.values(questions).map((question, indexQuestion) => {
                  return (
                    <QuestionModel
                      key={question + indexQuestion}
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
      <Timer />
    </div>
  );
}
