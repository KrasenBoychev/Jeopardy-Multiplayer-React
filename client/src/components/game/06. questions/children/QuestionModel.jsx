import { useAuthContext } from "../../../../contexts/AuthContext";
import { useGameContext } from "../../../../contexts/GameContext";

export default function QuestionModel({ props }) {
  const {
    activePlayer,
    categoryName,
    question,
    questionAnswered,
    setShowQuestion,
    setCurrCategory,
    setCurrQuestion,
  } = props;
  const { username } = useAuthContext();
  const { socket, friendSocketId } = useGameContext();

  const showQuestionClickHandler = async () => {
    if (questionAnswered) {
      return;
    }

    setShowQuestion(true);
    setCurrCategory(categoryName);
    setCurrQuestion(question);

    await socket.emit("sendQuestionOpened", {
      receiverSocketId: friendSocketId,
      categoryName,
      question,
    });
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
