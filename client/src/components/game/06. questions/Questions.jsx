export default function Questions() {
  return (
    <section>
      <QuestionsHeader activePlayer={activePlayer} />
      <div className="categories_names">
        {Object.keys(questions).map((categoryName) => {
          return <QuestionModel key={categoryName} props={{ categoryName }} />;
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
  );
}
