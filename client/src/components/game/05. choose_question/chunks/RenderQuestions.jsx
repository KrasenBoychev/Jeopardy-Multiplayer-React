import { useAuthContext } from "../../../../contexts/AuthContext";
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

  const { username } = useAuthContext();

  return (
    <div className="questions_page_wrapper">
      <section>
        <div className="players_points_wrapper">
          <h3>Score</h3>
          <div className="players_points">
            <p className="points_first_player">
              <span>{firstPlayer.username}:</span>
              <span>{pointsFirstPlayer} points</span>
            </p>
            <p className="points_second_player">
              <span>{secondPlayer.username}:</span>
              <span>{pointsSecondPlayer} points</span>
            </p>
          </div>
        </div>
      </section>

      <section>
        <p
          className={
            username === activePlayer
              ? "active_player player_categories"
              : "player_categories"
          }
        >
          {activePlayer} chooses question
        </p>
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
