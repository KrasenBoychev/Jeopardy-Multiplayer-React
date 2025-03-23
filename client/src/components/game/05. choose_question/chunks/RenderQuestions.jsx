import { useGameContext } from "../../../../contexts/GameContext";
import QuestionModel from "./QuestionModel";

export default function RenderQuestions({ props }) {
  const {
    activePlayer,
    firstPlayer,
    secondPlayer,
    pointsFirstPlayer,
    pointsSecondPlayer,
    questions,
  } = props;

  const { client } = useGameContext();

  return (
    <div className="questions-page-wrapper">
      <section>
        <div className="players-points-wrapper">
          <h3>Score</h3>
          <div className="players-points">
            <p className="points-first-player">
              <span>{firstPlayer}:</span>
              <span>{pointsFirstPlayer} points</span>
            </p>
            <p className="points-second-player">
              <span>{secondPlayer}:</span>
              <span>{pointsSecondPlayer} points</span>
            </p>
          </div>
        </div>
      </section>

      <section>
        <p
          className={
            client.user.name === activePlayer
              ? "active-player player-categories"
              : "player-categories"
          }
        >
          {activePlayer} chooses question
        </p>
        <div className="categories-names">
          {Object.keys(questions).map((categoryName) => {
            return (
              <QuestionModel key={categoryName} props={{ categoryName }} />
            );
          })}
        </div>

        <div className="questions-container">
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
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </section>

      <section>
        <p>Timer</p>
      </section>
    </div>
  );
}
