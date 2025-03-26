import { useAuthContext } from "../../../../contexts/AuthContext";

export default function QuestionModel({ props }) {
  const { activePlayer, categoryName, question, questionAnswered } = props;
  const { username } = useAuthContext();

  const showQuestionClickHandler = async () => {
    if (questionAnswered) {
      return;

      //TO DO
    }
  };

  return (
    <div
      className={
        !props.question
          ? "category_box"
          : questionAnswered
          ? "question_box question_answered"
          : username === activePlayer
          ? "question_box active_box"
          : "question_box inactive_box"
      }
      onClick={showQuestionClickHandler}
    >
      {props.question ? question.points : props.categoryName}
    </div>
  );
}
